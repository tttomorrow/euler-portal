<script lang="ts" setup>
//毕昇JDK
const bishengjdk = {
  BISHENG_BANNER_TEXT: ['毕昇JDK', 'ARM上最好用的JDK'],
  BISHENG_DESC: [
    '毕昇JDK是华为内部基于OpenJDK定制的Huawei JDK的开源版本。Huawei JDK运行在华为内部500多个产品上，研发团队积累了丰富的开发经验，解决了业务实际运行中遇到的多个疑难问题。',
    '毕昇JDK作为OpenJDK的下游，是一款高性能、可用于生产环境的OpenJDK发行版。毕昇JDK对华为内部应用场景中遇到的一些性能问题和稳定性问题进行了修复，并在ARM架构上进行了性能优化和稳定性增强，在ARM架构上更稳定，在大数据等场景下可以获得更好的性能。',
    '毕昇JDK致力于为JAVA开发者提供一款稳定可靠、高性能、易调测的JDK，也为用户在ARM架构上提供一个更好的选择。',
  ],
  BISHENG_LINK: [
    {
      IMG: '/img/projects/bisheng/zh-speker.png',
      TITLE: '开启毕昇JDK之旅',
      LINK_LIST: [
        {
          TEXT: '毕昇JDK8',
          LINK: 'https://gitee.com/openeuler/bishengjdk-8',
        },
        {
          TEXT: '毕昇JDK11',
          LINK: 'https://gitee.com/openeuler/bishengjdk-11',
        },
      ],
      STATUS: false,
    },
    {
      IMG: '/img/projects/bisheng/zh-sponsor.png',
      TITLE: '想对毕昇JDK说',
      LINK_LIST: [
        {
          TEXT: '毕昇JDK8',
          LINK: 'https://gitee.com/openeuler/bishengjdk-8/issues',
        },
        {
          TEXT: '毕昇JDK11',
          LINK: 'https://gitee.com/openeuler/bishengjdk-11/issues',
        },
      ],
      STATUS: false,
    },
    {
      IMG: '/img/projects/bisheng/meeting.png',
      TITLE: 'Compiler SIG例会信息',
      LINK_LIST: [
        'https://gitee.com/openeuler/bishengjdk-8/wikis/Compiler%20SIG%E4%BE%8B%E4%BC%9A?sort_id=4182234',
      ],
      STATUS: false,
    },
    {
      IMG: '/img/projects/bisheng/roadmap.png',
      TITLE: 'Roadmap',
      LINK_LIST: [
        'https://gitee.com/openeuler/bishengjdk-8/wikis/%E9%A1%B9%E7%9B%AE%E8%B7%AF%E6%A0%87?sort_id=4182245',
      ],
      STATUS: false,
    },
  ],
  BISHENG_MORE: '更多信息：',
  BISHENG_INFO: [
    {
      THEME: 'License: ',
      BODY: '采用GPLv2 with Classpath Exception协议。',
    },
    {
      THEME: '支持Java版本: ',
      BODY: '目前毕昇JDK支持8和11两个LTS版本。',
    },
    {
      THEME: '支持架构: ',
      BODY: '支持Linux/AArch64架构。',
    },
    {
      THEME: '支持操作系统: ',
      BODY: '目前仅支持Linux版本，对操作系统的要求是AArch64上glibc版本不低于2.17，基本覆盖所有主流操作系统，发布前经过稳定性验证的操作系统有openEuler 全系列操作系统和CentOS 7.6。',
    },
  ],
  BISHENG_FRAMEWORK: {
    TITLE_OUTSIDE: '架构',
    TITLE_INSIDE: 'ARCHITECTURE',
    DESC_LIST: [
      'JDK整体架构如下图所示，其中JRE指的是Java Runtime Environment，包括了Java运行时的虚拟机JVM（Java Virtual Machine）、Libraries等。而JDK是JRE的超集，包括了JRE的所有内容，并包含javac、jdb等开发者必须的编译器和调试器。JRE仅提供运行时库、Java虚拟机和其他一些运行Java应用程序所必须的组件。',
    ],
    FRAMEWORK_IMG: '/img/projects/bisheng/framework.png',
  },
  BISHENG_LEARN: {
    TITLE_OUTSIDE: '学习',
    TITLE_INSIDE: 'LEARNING',
    DATA_LIST: [
      {
        IMG: '/img/minisite/isula/compile.png',
        THEME: '文档',
        LINK: [
          {
            TEXT: '毕昇JDK 8',
            LINK: 'https://gitee.com/openeuler/bishengjdk-8/wikis/Home',
          },
          {
            TEXT: '毕昇JDK 11',
            LINK: 'https://gitee.com/openeuler/bishengjdk-11/wikis/Home',
          },
        ],
      },
      {
        IMG: '/img/minisite/atune/install.png',
        THEME: '课程',
        LINK: [
          {
            TEXT: '毕昇JDK使用',
            LINK: 'https://education.huaweicloud.com/courses/course-v1:HuaweiX+CBUCNXK067+Self-paced/about',
          },
        ],
      },
      {
        IMG: '/img/minisite/isula/desc.png',
        THEME: '下载',
        LINK: [
          {
            TEXT: '毕昇JDK历史版本',
            LINK: 'https://www.hikunpeng.com/zh/developer/devkit/compiler/jdk',
          },
        ],
      },
    ],
  },
  BISHENG_REFERENCE: {
    TITLE_OUTSIDE: '友情链接',
    TITLE_INSIDE: 'LINKS',
    LINK_LIST: [
      {
        TEXT: '毕昇JDK（鲲鹏社区） ',
        LINK: 'https://www.hikunpeng.com/developer/devkit/compiler/jdk',
      },
      {
        TEXT: '毕昇编译器（鲲鹏社区）',
        LINK: 'https://www.hikunpeng.com/developer/devkit/compiler/bisheng',
      },
      {
        TEXT: 'GCC for openEuler（鲲鹏社区）',
        LINK: 'https://www.hikunpeng.com/developer/devkit/compiler/gcc',
      },
    ],
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="obanner">
      <h2 class="title">{{ bishengjdk.BISHENG_BANNER_TEXT[0] }}</h2>
      <p class="text">{{ bishengjdk.BISHENG_BANNER_TEXT[1] }}</p>
    </div>
    <div class="bisheng-info">
      <div
        v-for="item in bishengjdk.BISHENG_LINK"
        :key="item.IMG"
        class="bisheng-info-item"
      >
        <img class="img" :src="item.IMG" alt="" />
        <!-- <p class="title">{{ item.TITLE }}</p> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bisheng-info {
  display: flex;
  justify-content: space-between;
}
</style>
