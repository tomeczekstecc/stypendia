mongo -- "$MONGO_INITDB_DATABASE" <<EOF
db.createUser({user:"adminowski",pwd: XPy4hPZt%B7?tjRr",roles: [{role: "readWrite", db: "logs"}]})
