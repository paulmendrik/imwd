<script context="module">

let titles = [
    { id: 'intro', name: 'Intro' },
    { id: 'web-design', name: 'Design' },
    { id: 'custom', name: 'Mobile' },
    { id: 'seo', name: 'SEO' },
    { id: 'web-hosting', name: 'Hosting' },
    { id: 'contact', name: 'Contact' }
];

let active = false;


</script>

<div id="menu" uk-offcanvas="flip: true;">
<section class="uk-text-center menu" uk-scrollspy="cls:uk-animation-scale-up; target: .content; delay: 1200">
<div class="content uk-width-1-2@m uk-width-1-1@s">
<ul class="uk-list">
{#each titles as { id, name }, i}
<li><a href="#{id}"  on:click="{() => active = !active }"><h2>{name}</h2></a></li>
{/each}
</ul>
</div>
</section>
</div>