mongo -- "$MONGO_INITDB_DATABASE" <<EOF
db.createUser({user:"rootowski",pwd: "A4P!umWaqSVj8^S&",roles: [{role: "readWrite", db: "logs"}]})
