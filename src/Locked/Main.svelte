<script>
    import { authenticate } from '../authenticate';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let disabled = false;

    const unlock = async () => {
        disabled = true;
        authenticate()
            .then(keyPair => dispatch('unlock', { keyPair }))
            .catch(error => alert('You have to install an Ethereum client.'));
    }
</script>

<style>
    main {
        height: calc(100% - 64px - 64px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        text-align: center;
    }

    svg {
        fill: var(--color-header-search);
    }

    button {
        color: var(--color-white);
        height: 48px;
        width: 200px;
        background: var(--color-blue);
        border-radius: 3px;
        cursor: pointer;
        text-align: center;
        position: relative;
        overflow: hidden;
    }
    button svg {
        display: none;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
    }
    button:disabled {
        width: 48px;
        border-radius: 50%;
        cursor: default;
    }
    button:disabled span {
        display: none;
    }
    button:disabled svg {
        display: block;
    }
</style>

<main class="container">
    <svg width="128" height="128">
        <use xlink:href="#icon-lock" />
    </svg>

    <h3>
        <strong>Password Manager</strong><br>for the Decentralized Web
    </h3>

    <br>

    <button type="button" on:click={unlock} {disabled}>
        <span>Authenticate</span>

        <svg width="48" height="48">
            <use xlink:href="#icon-loading" />
        </svg>
    </button>
</main>
