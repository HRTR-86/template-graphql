FROM php:8.3-apache-bullseye

ENV TZ="Asia/Tokyo"

RUN apt-get update \
  && apt-get install -y \
    zlib1g-dev \
    libzip-dev \
    unzip \
    vim \
    iputils-ping \
    net-tools \
    sudo \
  && docker-php-ext-install zip \
  && docker-php-ext-install pdo_mysql \
  && pecl install redis \

RUN mkdir -m 777 -p /var/www/html

RUN curl https://getcomposer.org/download/2.7.2/composer.phar -o /usr/local/bin/composer -s \
    && chmod 755 /usr/local/bin/composer

RUN apt-get install -y gnupg
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -\
    && apt-get install -y nodejs

RUN apt-get update && \
    apt-get install -y git

COPY php.ini /usr/local/etc/php/php.ini
COPY 000-default.conf /etc/apache2/sites-enabled/000-default.conf
RUN ln -s /etc/apache2/mods-available/rewrite.load \
    /etc/apache2/mods-enabled/rewrite.load
