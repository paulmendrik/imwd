<script context="module">
    import HeadMeta from '../components/HeadMeta.svelte';
    import Nav from '../components/Nav.svelte';
    import PrismicHTML from '../components/PrismicHTML.svelte';
    import Prismic from 'prismic-javascript';
	import PrismicDOM from 'prismic-dom';
	import { Client } from '../../prismic-config.js';

	let items = null;

	export async function preload({ params, query }) {

      const response = await Client.query(
          Prismic.Predicates.at('document.type', 'page'),
          { orderings : '[my.page.date]' }
      )

        items = response.results

		if ( items ) {
			return {items};
        } else {
          this.error(res.status, data.message);
        }
	}

</script>

<script>
export let items;
</script>

<HeadMeta
site='https://www.imwd.design'
title='IMWD Design'
description={`We turn ideas into accessible experiences.`}
/>
<svelte:head></svelte:head>
<main>
<Nav/>
{#each items as item}
<section class="uk-text-center {item.uid}" id="{item.uid}"  uk-scrollspy="cls:uk-animation-scale-up; target: .content; delay: 1200; repeat: true">
<div class="content uk-width-1-2@m uk-width-1-1@s">
<h2 class="uk-article-title">{PrismicDOM.RichText.asText(item.data.title)}</h2>
<div class="title-line uk-margin-auto"></div>
<PrismicHTML elements={item.data.text} />
{#if item.uid === "contact"}
<a href="mailto:hello@imwd.fr">hello@imwd.design</a>
<a href="tel:+33 606432356">+33 606 43 23 56</a>
{/if}
</div>
</section>
{/each}
</main>



