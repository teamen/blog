#!/bin/bash


npm run dll && npm run dist

php transformer.php

echo '\tFinshed.';
