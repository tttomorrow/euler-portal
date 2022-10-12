export default [
  {
    name: 'oec-hardware',
    description: 'openEuler硬件兼容性验证测试框架',
    summary:
      'oec-hardware是保证 openEuler 与硬件平台的兼容性，验证仅限于基本功能验证，不包括性能测试等其它测试。',
    version: '1.0.0',
    source: {
      name: '获取源码',
      link: 'https://gitee.com/openeuler/oec-hardware',
    },
    doc: {
      name: 'oec-hardware使用指南',
      link: 'https://gitee.com/openeuler/oec-hardware/blob/master/README.md',
    },
  },
  {
    name: 'Compass-CI',
    description: '一个可持续集成的开源开放式测试服务平台',
    summary:
      '集构建&测试系统、登录调测、测试分析比较、辅助定位于一体，旨在给社区开发者提供友好的开发体验，与社区开发者一起繁荣开源软件生态及提升开源软件质量。',
    version: '1.0.0',
    source: {
      name: '获取源码',
      link: 'https://gitee.com/openeuler/compass-ci',
    },
    doc: {
      name: 'Compass-CI使用指南',
      link: 'https://gitee.com/openeuler/compass-ci/blob/master/README.zh.md',
    },
  },
  {
    name: 'x2openEuler',
    description: '从其他系统迁移到openEuler硬件和软件、配置兼容性评估',
    summary:
      '软件评估，支持扫描并分析软件包、源码包，评估软件的兼容性及可移植性。配置评估，支持扫描并收集环境的操作系统配置信息，评估用户操作系统的配置兼容性。硬件评估，支持扫描并分析用户环境硬件信息，评估硬件兼容性。',
    version: '2.0.0',
    source: {
      name: '软件获取',
      link: 'https://repo.oepkgs.net/openEuler/rpm/openEuler-20.03-LTS-SP1/contrib/x2openEuler/',
    },
    doc: {
      name: 'x2openEuler使用指南',
      link: 'https://docs.openeuler.org/zh/docs/20.03_LTS_SP1/docs/thirdparty_migration/x2openEuler用户指南.html',
    },
  },
  {
    name: 'oecp',
    description: '操作系统之间的差异比较及兼容性分析工具',
    summary:
      '1.检测2个ISO（基于RPM）的软件包，软件包内文件，库文件接口（C/C++）,内核KABI的变化差异，根据这些差异可以分析2个OS之间的兼容性，为软件移植提供了重要参考 2.OECP还可以检测同一个软件（RPM包）在不同版本下的变化以及差异，判断软件包的文件，接口等变化，可以分析得出软件不同版本之间的兼容性。',
    version: '1.0.0',
    source: {
      name: '获取源码',
      link: 'https://toscode.gitee.com/openeuler/oecp/tree/master',
    },
    doc: {
      name: 'oecp使用指南',
      link: 'https://toscode.gitee.com/openeuler/oecp/blob/master/README.md',
    },
  },
];
