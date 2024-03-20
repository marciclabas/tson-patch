help:
  @just --list

publish: build upload

# Build, increment patch number and publish
republish: patch build upload

patch:
  yarn version --patch

# Publish to npm
upload:
  cd dist && npm publish --access=public
  rm -drf dist

# Build package into dist/, copying relevant files
build: 
  rm -dr dist || :
  yarn run build
  @just copy

# Copy package.json, tsconfig.json and README.md to dist/
copy:
  cp package.json dist
  cp tsconfig.json dist
  cp README.md dist

# Install a package as both --dev and --peer (pseudo-analogous to python extras)
extra PACKAGE:
  yarn add --peer {{PACKAGE}} && yarn add --dev {{PACKAGE}}
  

# Install react stuff
install-react:
  yarn add --dev eslint-plugin-react-hooks
  yarn add react react-dom --dev @types/react @types/react-dom

install-ramda:
  yarn add ramda --dev @types/ramda


# Convert *.js to *.ts imports
denify:
  #!/bin/bash
  for file in $(find src -type f); do
    sed -i -E "s/(.js)([\"'])/.ts\2/g" $file #'
  done
  mv .deno.json deno.json || touch deno.json

# Convert *.js to *.js imports
nodify:
  #!/bin/bash
  for file in $(find src -type f); do
    sed -i -E "s/(.ts)([\"'])/.js\2/g" $file #'
  done
  mv deno.json .deno.json || :
