#!/bin/bash
set -e

echo "===> Dumping malice data to ..."
elasticdump \
  --input=http://elasticsearch:9200/malice \
  --type=data \
  --output=$ \
  | gzip > malice.json.gz

echo "===> Dumping malice mapping to ..."
elasticdump \
  --input=http://elasticsearch:9200/malice \
  --type=mapping \
  --output=$ \
  | gzip > malice_mapping.json.gz

# elasticdump \
#   --input=malice_mapping.json \
#   --output=http://localhost:9200/malice \
#   --type=mapping

# elasticdump \
# --input=malice_data.json \
# --output=http://localhost:9200/malice \
#   --type=data
