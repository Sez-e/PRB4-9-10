FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN cd product_server && npm install --legacy-peer-deps && cd .. && \
    cd admin_api && npm install --legacy-peer-deps && cd ..

EXPOSE 3000 8080 4000 5000

RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'cd /app/product_server && node server.js &' >> /app/start.sh && \
    echo 'cd /app/admin_api && node server.js &' >> /app/start.sh && \
    echo 'cd /app && node graphql_server.js &' >> /app/start.sh && \
    echo 'cd /app && node chat_server.js &' >> /app/start.sh && \
    echo 'wait' >> /app/start.sh && \
    chmod +x /app/start.sh

CMD ["/bin/sh", "/app/start.sh"] 