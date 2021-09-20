FROM registry.access.redhat.com/ubi8/nodejs-14
USER 0

WORKDIR /src

RUN curl -sL https://rpm.nodesource.com/setup_16.x | bash -

RUN yum remove -y nodejs npm

RUN yum install -y nodejs

RUN yum install -y bzip2 fontconfig nss.x86_64 pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 libdrm libgbm libxshmfence

ADD package.json /src

# RUN npm cache clean --force

# Development env option --unsafe-perm to override 'Access Denied' errors on the volumes
# Prod env will not need this option
RUN npm install --unsafe-perm

ADD . /src

# Do not build it for development env since we anyway build the assets in the container
# Required for Production env only
# RUN npm run build

