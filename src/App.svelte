<script>
    import Locked from './Locked.svelte';
    import Unlocked from './Unlocked.svelte';

    let keyPair = null;
    let timeout = null;

    const updateLock = event => keyPair = event.detail.keyPair;

    const resetTimer = () => {
        if (!timeout && !keyPair) {
            return;
        }

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            keyPair = null;
        }, 10 * 60 * 1000);
    };
</script>

<svelte:window on:mousemove={resetTimer} on:mousedown={resetTimer} on:click={resetTimer} on:scroll={resetTimer} on:keyup={resetTimer} />

{#if keyPair}
    <Unlocked {keyPair} on:lock={updateLock} />
{:else}
    <Locked on:unlock={updateLock} />
{/if}
