FROM registry.access.redhat.com/ubi8/nodejs-16

USER 0

# install puppeteer/chromium dependencies
RUN dnf install -y bzip2 fontconfig nss.x86_64 pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 libdrm libgbm libxshmfence
RUN dnf install -y GConf2 nss libXScrnSaver alsa-lib wget

WORKDIR /pdf-gen
ADD . /pdf-gen

# RUN npm install using package-lock.json
RUN npm ci
# Install the chromium locally if necessary.
RUN node node_modules/puppeteer/install.js
RUN chmod -R o+rwx node_modules/puppeteer/.local-chromium

# Set node env variable
ENV NODE_ENV=production

RUN npm run build

# Remove all unecessary node_modules to reduce the total image size
RUN find ./node_modules -maxdepth 1 ! -name puppeteer -type d -not -path './node_modules' -exec rm -rf {} +

EXPOSE 8000
CMD ["node", "./dist/index.js"]
