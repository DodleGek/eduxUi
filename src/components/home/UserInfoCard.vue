<template>
    <el-card shadow="hover">
        <div class="user">
            <img :src="getImgUrl(avatar)" class="user" />
            <div class="user-info">
                <p class="user-info-admin">{{ username }}</p>
                <p class="user-info-p">{{ role }}</p>
            </div>
        </div>
        <div class="login-info">
            <p>登录时间:<span>{{ loginTime }}</span></p>
            <p>登录IP:<span>{{ loginIp }}</span></p>
        </div>
    </el-card>
</template>

<script setup>
defineProps({
    username: {
        type: String,
        default: 'admin'
    },
    role: {
        type: String,
        default: '超级管理员'
    },
    avatar: {
        type: String,
        default: 'user'
    },
    loginTime: {
        type: String,
        required: true
    },
    loginIp: {
        type: String,
        required: true
    }
});

const getImgUrl = (user) => {
    return new URL(`../../assets/images/${user}.png`, import.meta.url).href;
};
</script>

<style scoped lang="less">
.user {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;

    img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-right: 40px;
    }

    .user-info {
        p {
            line-height: 40px;
        }

        .user-info-p {
            color: #999;
        }

        .user-info-admin {
            font-size: 35px;
        }
    }
}

.login-info {
    p {
        line-height: 30px;
        font-size: 14px;
        color: #999;

        span {
            color: #666;
            margin-left: 60px
        }
    }
}
</style>