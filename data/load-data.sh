#!/bin/bash
set -e

set_up_elasticsearch() {
	# wait for elasticsearch to come online
	until wget -q -O - 127.0.0.1:9200/ > /dev/null 2>&1; do
	  echo "* Elasticsearch is unavailable - sleeping 3s"
	  sleep 3
	done
}

set_up_elasticsearch

echo "===> Writting malice sample data to elasticsearch..."

echo " * importing malice mapping"
cat malice_mapping.json.gz | gunzip | elasticdump \
  --input=$ \
  --output=http://localhost:9200/malice \
  --type=mapping

# elasticdump \
#   --input=malice_mapping.json \
#   --output=http://localhost:9200/malice \
#   --type=mapping

echo " * importing malice data"
cat malice.json.gz | gunzip | elasticdump \
  --input=$ \
  --output=http://localhost:9200/malice \
  --type=data

# elasticdump \
# elasticdump \
#   --input=malice.json \
#   --output=http://localhost:9200/malice \
#   --type=data
