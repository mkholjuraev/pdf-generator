FROM registry.access.redhat.com/ubi8/nodejs-14

USER 0
RUN curl -sL https://rpm.nodesource.com/setup_16.x | bash -
RUN dnf remove -y nodejs npm
RUN dnf install -y nodejs

RUN dnf install -y bzip2 fontconfig nss.x86_64 pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 libdrm libgbm libxshmfence
RUN dnf install -y GConf2 nss libXScrnSaver alsa-lib wget

WORKDIR /src
ADD . /src

# RUN npm install using package-lock.json
RUN npm ci --also=dev

# To address: Babel could not write cache to file:
# /src/node_modules/.cache/@babel/register/.babel.7.15.5.development.json
# seen in ephemeral env only
RUN mkdir -m 777 node_modules/.cache

RUN mkdir build

RUN npm run build
RUN npm install cypress
RUN chown -R default /opt/app-root/
RUN chmod 777 -R /opt/app-root/

EXPOSE 8000
CMD ["node", "./server/index.js"]
