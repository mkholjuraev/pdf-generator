FROM registry.access.redhat.com/ubi8/nodejs-14

USER 0
RUN curl -sL https://rpm.nodesource.com/setup_16.x | bash -
RUN yum remove -y nodejs npm
RUN yum install -y nodejs
RUN yum install -y bzip2 fontconfig nss.x86_64 pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 libdrm libgbm libxshmfence

WORKDIR /src
ADD package.json /src
RUN npm install

# To address: Babel could not write cache to file:
# /src/node_modules/.cache/@babel/register/.babel.7.15.5.development.json
# seen in ephemeral env only
RUN mkdir -m 777 node_modules/.cache

RUN mkdir build
RUN mkdir pdfs
ADD . /src
RUN npm run build

EXPOSE 8000
CMD ["node", "./server/index.js"]
