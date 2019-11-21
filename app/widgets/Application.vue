<template>
    <StackLayout>
        <Image :src="item.image" class="thumb" />
        <StackLayout>
            <Label class="list-group-item-heading" :text="item.name" textWrap="true" />
            <Label class="list-group-item-text" text="The rest of the content" textWrap="true" />
        </StackLayout>
    </StackLayout>
</template>

<script type="text/babel">
    export default {
        name: 'application',
        props: {
            item: {
                type: Object,
                default: () => {}
            }
        }
    }
</script>

<style scoped>

</style>