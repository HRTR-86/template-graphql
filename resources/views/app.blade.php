<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="/favicon.png">
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;600;700&display=swap" rel="stylesheet">

        <title>テンプレート</title>

        @inertiaHead
        @viteReactRefresh
        @vite('resources/scripts/app.jsx')
    </head>
    <body class="antialiased">
        @inertia
    </body>
</html>
