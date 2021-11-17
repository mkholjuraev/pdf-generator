FROM registry.access.redhat.com/ubi8/nodejs-14

USER 0
RUN curl -sL https://rpm.nodesource.com/setup_16.x | bash -
RUN dnf remove -y nodejs npm
RUN dnf install -y nodejs

RUN dnf install -y bzip2 fontconfig nss.x86_64 pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 libdrm libgbm libxshmfence
RUN dnf install -y GConf2 nss libXScrnSaver alsa-lib

WORKDIR /src
ADD . /src

RUN wget "https://ftp.redhat.com/pub/redhat/rhel/rhel-8-beta/appstream/x86_64/Packages/libfontenc-1.1.3-8.el8.x86_64.rpm" -o /tmp/libfontenc-1.1.3-8.el8.x86_64.rpm
RUN wget "https://ftp.redhat.com/pub/redhat/rhel/rhel-8-beta/appstream/x86_64/Packages/libXdmcp-1.1.2-11.el8.x86_64.rpm" -o /tmp/libXdmcp-1.1.2-11.el8.x86_64.rpm
RUN wget "https://ftp.redhat.com/pub/redhat/rhel/rhel-8-beta/appstream/x86_64/Packages/mesa-libglapi-18.2.2-1.el8.x86_64.rpm" -o /tmp/mesa-libglapi-18.2.2-1.el8.x86_64.rpm
RUN wget "https://ftp.redhat.com/pub/redhat/rhel/rhel-8-beta/appstream/x86_64/Packages/libglvnd-1.0.1-0.9.git5baa1e5.el8.x86_64.rpm" -o /tmp/libglvnd-1.0.1-0.9.git5baa1e5.el8.x86_64.rpm
RUN wget "https://ftp.redhat.com/pub/redhat/rhel/rhel-8-beta/appstream/x86_64/Packages/libXfont2-2.0.3-2.el8.x86_64.rpm" -o /tmp/libXfont2-2.0.3-2.el8.x86_64.rpm
RUN wget "https://ftp.redhat.com/pub/redhat/rhel/rhel-8-beta/appstream/x86_64/Packages/xorg-x11-server-common-1.20.2-5.el8.x86_64.rpm" -o /tmp/xorg-x11-server-common-1.20.2-5.el8.x86_64.rpm
RUN wget "https://ftp.redhat.com/pub/redhat/rhel/rhel-8-beta/appstream/x86_64/Packages/libglvnd-glx-1.0.1-0.9.git5baa1e5.el8.x86_64.rpm" -o /tmp/libglvnd-glx-1.0.1-0.9.git5baa1e5.el8.x86_64.rpm
RUN wget "https://ftp.redhat.com/pub/redhat/rhel/rhel-8-beta/appstream/x86_64/Packages/libxkbfile-1.0.9-9.el8.x86_64.rpm" -o /tmp/libxkbfile-1.0.9-9.el8.x86_64.rpm
RUN wget "https://ftp.redhat.com/pub/redhat/rhel/rhel-8-beta/appstream/x86_64/Packages/xorg-x11-server-Xvfb-1.20.2-5.el8.x86_64.rpm" -o /tmp/xorg-x11-server-Xvfb-1.20.2-5.el8.x86_64.rpm
RUN wget "https://ftp.redhat.com/pub/redhat/rhel/rhel-8-beta/appstream/x86_64/Packages/libICE-1.0.9-13.el8.x86_64.rpm" -o /tmp/libICE-1.0.9-13.el8.x86_64.rpm
RUN wget "https://ftp.redhat.com/pub/redhat/rhel/rhel-8-beta/appstream/x86_64/Packages/libXmu-1.1.2-12.el8.x86_64.rpm" -o /tmp/libXmu-1.1.2-12.el8.x86_64.rpm
RUN wget "https://ftp.redhat.com/pub/redhat/rhel/rhel-8-beta/appstream/x86_64/Packages/xorg-x11-xauth-1.0.9-12.el8.x86_64.rpm" -o /tmp/xorg-x11-xauth-1.0.9-12.el8.x86_64.rpm
RUN wget "https://ftp.redhat.com/pub/redhat/rhel/rhel-8-beta/appstream/x86_64/Packages/libSM-1.2.3-1.el8.x86_64.rpm" -o /tmp/libSM-1.2.3-1.el8.x86_64.rpm
RUN wget "https://ftp.redhat.com/pub/redhat/rhel/rhel-8-beta/appstream/x86_64/Packages/libXt-1.1.5-8.el8.x86_64.rpm" -o /tmp/libXt-1.1.5-8.el8.x86_64.rpm
RUN wget "https://ftp.redhat.com/pub/redhat/rhel/rhel-8-beta/appstream/x86_64/Packages/xorg-x11-xkb-utils-7.7-26.el8.x86_64.rpm" -o /tmp/xorg-x11-xkb-utils-7.7-26.el8.x86_64.rpm
RUN wget "https://ftp.redhat.com/pub/redhat/rhel/rhel-8-beta/appstream/x86_64/Packages/libsmi-0.4.8-22.el8.x86_64.rpm" -o /tmp/libsmi-0.4.8-22.el8.x86_64.rpm
RUN wget "https://ftp.redhat.com/pub/redhat/rhel/rhel-8-beta/appstream/x86_64/Packages/libXxf86vm-1.1.4-9.el8.x86_64.rpm" -o /tmp/libXxf86vm-1.1.4-9.el8.x86_64.rpm
RUN wget "https://ftp.redhat.com/pub/redhat/rhel/rhel-8-beta/appstream/x86_64/Packages/libX11-xcb-1.6.7-1.el8.x86_64.rpm" -o /tmp/libX11-xcb-1.6.7-1.el8.x86_64.rpm
RUN wget "https://ftp.redhat.com/pub/redhat/rhel/rhel-8-beta/appstream/x86_64/Packages/mesa-libGL-18.2.2-1.el8.x86_64.rpm" -o /tmp/mesa-libGL-18.2.2-1.el8.x86_64.rpm

RUN yum install /tmp/*.rpm

# RUN npm install using package-lock.json
RUN npm ci

# To address: Babel could not write cache to file:
# /src/node_modules/.cache/@babel/register/.babel.7.15.5.development.json
# seen in ephemeral env only
RUN mkdir -m 777 node_modules/.cache

RUN mkdir build

RUN npm run build
RUN npm install cypress

EXPOSE 8000
CMD ["node", "./server/index.js"]
