docker pull postgres

docker run -itd \
  -e POSTGRES_USER=hunghoang \
  -e POSTGRES_PASSWORD=hunghoang \
  -e POSTGRES_DB=userdb \
  -p 5678:5432 \
  -v /Users/hunghoang/zaloServices/userServices/data:/var/lib/postgresql/data \
  --name postgresql \
  postgres


yarn sequelize-cli model:generate --name User --attributes id:uuid,firstName:string,lastName:string,email:string,phone:string,sex:boolean,birthDay:date,email:string



