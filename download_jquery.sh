#!/bin/bash

set -euo pipefail

url="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"
dest_dir="assets/js/lib"

pushd "${dest_dir}" && { curl -LO "${url}"; popd; }

