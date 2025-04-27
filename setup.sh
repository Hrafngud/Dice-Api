#!/bin/bash

# Create main directories
mkdir -p src/controllers src/models src/routes ../public/css ../public/js

# Create files after directories
touch src/controllers/rollController.js
touch src/models/diceModel.js
touch src/routes/rollRoutes.js
touch ../public/index.html
touch ../public/css/style.css
touch ../public/js/app.js
touch ../app.js

# Output the structure created
echo "Folder and file structure created:"
echo "  /src/controllers/rollController.js"
echo "  /src/models/diceModel.js"
echo "  /src/routes/rollRoutes.js"
echo "  /public/index.html"
echo "  /public/css/style.css"
echo "  /public/js/app.js"
echo "  /app.js"
