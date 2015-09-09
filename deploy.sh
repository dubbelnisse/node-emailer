docker build -t node-email .
docker tag -f node-email tutum.co/dubbelnisse/node-email
docker push tutum.co/dubbelnisse/node-email
