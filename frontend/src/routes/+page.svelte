<script lang="ts">
	import type { HealthCheckResponse } from '@garage/shared';

	let health: HealthCheckResponse = {
		status: 'ok',
		timestamp: new Date().toISOString()
	};
</script>

<h1>Welcome to SvelteKit</h1>
<p>Status: {health.status}</p>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
