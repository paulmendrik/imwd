<script>
    export let site
    export let title
    export let description
</script>

<svelte:head>
    <title>{title}</title>

    <meta name="theme-color" content="#000" />

    <meta name="keywords" content="mobile app development, Vue, React, CSS, accessibility, usability">
    <meta name="description" content={description}>

    <link rel='icon' type='image/png' href='favicon.png'>
    <link rel="icon" type="image/png" href="favicon192.png" sizes="192x192">
    <link rel="apple-touch-icon" href="favicon512.png" sizes="512x512">

    <meta name="twitter:creator" content="@imwd">
    <meta name="twitter:title" content={ title }>
    <meta name="twitter:description" content={ description }>

    <meta property="og:url" content={ site }>
    <meta property="og:title" content={ title }>
    <meta property="og:description" content={ description }>
    <meta property="og:site_name" content={ title }>

    <link rel="stylesheet" href="global.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.5.5/dist/css/uikit.min.css" />
    <link rel="stylesheet" href="https://use.typekit.net/har8vyv.css">
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.5.5/dist/js/uikit.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.5.5/dist/js/uikit-icons.min.js"></script>
</svelte:head>