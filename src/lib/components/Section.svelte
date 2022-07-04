
<script lang="ts">
    export let bgClass: string = ""
    export let overlayClass: string = ""
    export let paddingClass: string = "md:px-36 py-44"
    
    let classes: string = ""
    let sectionId: string = ""
    export { classes as class, sectionId as id}
</script>

<div class="w-full {bgClass}" id={sectionId}>
    <div class={overlayClass}>
        <div class="container relative {paddingClass} {classes}">
            <slot></slot>
        </div>
    </div>
</div>