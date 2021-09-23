docker rmi $(docker images -a -q)

IMAGES_TO_DELETE=$( aws ecr list-images --region us-east-2 --repository-name en --query 'imageIds[*]' --output json )

aws ecr batch-delete-image --region us-east-2 --repository-name en --image-ids "$IMAGES_TO_DELETE" || true

