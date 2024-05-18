<template>
    <div class="d-sm-none">
        <div class="badge border border-white text-white me-1 mb-1" v-for="member,m in group.slice(0,4)" :key="m">
            <b>{{ capitalize(member) }}</b>
        </div>
        <div class="badge border border-white text-white me-1 mb-1" v-if="group.length>4">
            <b>{{ group.length-4 }} más..</b>
        </div>
    </div>
    <div class="d-none d-sm-flex d-md-none">
        <div class="badge border border-white text-white me-1 mb-1" v-for="member,m in group.slice(0,6)" :key="m">
            <b>{{ capitalize(member) }}</b>
        </div>
        <div class="badge border border-white text-white me-1 mb-1" v-if="group.length>6">
            <b>{{ group.length-6 }} más..</b>
        </div>
    </div>
    <div class="d-none d-md-flex d-lg-none">
        <div class="badge border border-white text-white me-1 mb-1" v-for="member,m in group.slice(0,8)" :key="m">
            <b>{{ capitalize(member) }}</b>
        </div>
        <div class="badge border border-white text-white me-1 mb-1" v-if="group.length>8">
            <b>{{ group.length-8 }} más..</b>
        </div>
    </div>
    <div class="d-none d-lg-flex">
        <div class="badge border border-white text-white me-1 mb-1" v-for="member,m in group.slice(0,12)" :key="m">
            <b>{{ capitalize(member) }}</b>
        </div>
        <div class="badge border border-white text-white me-1 mb-1" v-if="group.length>12">
            <b>{{ group.length-12 }} más..</b>
        </div>
    </div>
</template>

<script>
import {capitalize} from '@/utils'
export default {
    name:'ListGroupMembers',
    props:{
        group:{
            type:Object,
            default:null,
        }
    },
    methods:{capitalize}
}
</script>

