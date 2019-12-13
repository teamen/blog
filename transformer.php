<?php

use Carbon\Carbon;
use Illuminate\Filesystem\Filesystem;

require_once __DIR__ . '/vendor/autoload.php';

$parser = new \cebe\markdown\Markdown();

$filesystem = new Filesystem();

Carbon::setLocale('zh');
$cacheDir  = 'cache';
$outputDir = 'dist';

const ESSAY_DIR  = __DIR__ . '/dist/essays';
const OUTPUT_DIR = __DIR__ . '/dist';
const STATIC_DIR = __DIR__ . '/dist/statics';

$essayFiles       = $filesystem->allFiles(ESSAY_DIR);
$essays           = [];
$essayHashMapping = [];
foreach ($essayFiles as $file) {
    $essay             = new stdClass();
    $rawContent        = $filesystem->get($file);
    $essay->rawContent = $rawContent;
    // essay  file:
    // 1st line => title
    // 2nd line => date
    // filename => slug
    preg_match('/(.*)\n(.*)\n?/', $rawContent, $info);
    $essay->title                       = $info[1];
    $essay->editedAt                    = Carbon::parse($info[2]);
    $essay->content                     = $parser->parse(str_replace($info[0], '', $rawContent));
    $essay->filename                    = $filesystem->name($file);
    $essay->hash                        = $filesystem->hash($file);
    $essay->lastModified                = $filesystem->lastModified($file);
    $essays[$essay->filename]           = $essay;
    $essayHashMapping[$essay->filename] = $essay->hash;
}
// sort essays
usort($essays, function ($prev, $next) {
    return $prev->lastModified < $next->lastModified;
});

$lastTransformHashSet = [];
$lastTransformLogPath = __DIR__ . '/storage/last_transform.log';
if ($filesystem->exists($lastTransformLogPath)) {
    $lastTransformHashSet = unserialize(file_get_contents($lastTransformLogPath));
}
file_put_contents($lastTransformLogPath, serialize($essayHashMapping));

$staticsIniFile = STATIC_DIR . '/statics.ini';
$bundleInifile  = STATIC_DIR . '/vendor/bundle.ini';
$staticFiles    = [];
$bundleFiles    = [];
$filesystem->exists($staticsIniFile) && ($staticFiles = parse_ini_file($staticsIniFile, true));
$filesystem->exists($bundleInifile) && ($bundleFiles = parse_ini_file($bundleInifile, true));

$isNeedToUpdateStatic = true;

$staticHashPath = __DIR__ . '/storage/static.hash';
$bundleHashPath = __DIR__ . '/storage/bundle.hash';
if ($filesystem->exists($staticHashPath) &&
    file_get_contents($staticHashPath) === $filesystem->hash($staticsIniFile) &&
    $filesystem->exists($bundleHashPath) &&
    file_get_contents($bundleHashPath) === $filesystem->hash($bundleInifile)

) {
    $isNeedToUpdateStatic = false;
}
file_put_contents($staticHashPath, $filesystem->hash($staticsIniFile));
file_put_contents($bundleHashPath, $filesystem->hash($bundleInifile));

$context            = [];
$context['currentYear'] = date('Y');
$context['statics'] = $staticFiles;
$context['bundles'] = $bundleFiles;

// load template ， render and generate static page
$loader = new Twig_Loader_Filesystem('templates');
$twig   = new Twig_Environment($loader);

if ($isNeedToUpdateStatic || !$filesystem->exists(OUTPUT_DIR . '/index.html')) {
    $indexHtml = $twig->load('index.twig')->render($context);
    $filesystem->put(OUTPUT_DIR . '/index.html', $indexHtml);
}

$essayTranformedLog = [];
foreach ($essays as $essay) {
    if ($isNeedToUpdateStatic === false &&
        isset($lastTransformHashSet[$essay->filename]) &&
        $lastTransformHashSet[$essay->filename] === $essay->hash &&
        $filesystem->exists(OUTPUT_DIR . '/' . $essay->filename . '.html')
    ) {
        continue;
    }

    $essayHtml     = $twig->load('essay.twig')->render(array_merge($context, ['essay' => $essay]));
    $essayFilename = OUTPUT_DIR . '/' . $essay->filename . '.html';
    $filesystem->put($essayFilename, $essayHtml);
    $essayTranformedLog[] = $essayFilename;
}

if ($isNeedToUpdateStatic ||
    !$filesystem->exists(OUTPUT_DIR . '/essays.html') ||
    count($essayTranformedLog)
) {
    $essaysHtml = $twig->load('essays.twig')->render(array_merge(['essays' => $essays], $context));
    $filesystem->put(OUTPUT_DIR . '/essays.html', $essaysHtml);
}
if ($essayTranformedLog) {
    printf("%d essays transformed", count($essayTranformedLog));
    exit;
}

printf("Nothing transformed");
