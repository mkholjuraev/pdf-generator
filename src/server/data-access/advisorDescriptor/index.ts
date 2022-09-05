import { ServiceCallFunction, ServiceDescriptor } from '../call-service';
import ServiceNames from '../../../common/service-names';

const advisorData = [
  {
    total: 2129,
    total_risk: { '1': 7, '2': 2079, '3': 1155, '4': 284 },
    category: {
      Availability: 1414,
      Performance: 865,
      Security: 874,
      Stability: 1851,
    },
  },
  {
    total: 8990,
    total_risk: { '1': 13, '2': 5530, '3': 3163, '4': 284 },
    category: {
      Availability: 2760,
      Performance: 966,
      Security: 876,
      Stability: 4388,
    },
  },
  {
    meta: { count: 67 },
    links: {
      first:
        '/api/insights/v1/rule/?impacting=true&limit=3&offset=0&sort=-total_risk%2C-impacted_count',
      next: '/api/insights/v1/rule/?impacting=true&limit=3&offset=3&sort=-total_risk%2C-impacted_count',
      previous:
        '/api/insights/v1/rule/?impacting=true&limit=3&offset=0&sort=-total_risk%2C-impacted_count',
      last: '/api/insights/v1/rule/?impacting=true&limit=3&offset=64&sort=-total_risk%2C-impacted_count',
    },
    data: [
      {
        rule_id: 'empty_grubenv|EMPTY_GRUBENV_KERNELOPTS',
        created_at: '2021-11-18T06:15:39.463490Z',
        updated_at: '2022-01-07T06:15:39.108363Z',
        description:
          'Reboot fails when there is no "kernelopts" option in the grubenv',
        active: true,
        category: { id: 3, name: 'Stability' },
        impact: { name: 'Boot Failure', impact: 4 },
        likelihood: 4,
        node_id: '6488061',
        tags: 'grub reboot sbr_shells',
        playbook_count: 1,
        reboot_required: false,
        publish_date: '2021-11-28T03:16:00Z',
        summary:
          'Reboot fails when there is no "kernelopts" option in the grubenv.\n',
        generic:
          'Reboot fails when there is no **"kernelopts"** option in the grubenv.\n',
        reason:
          'This host is running RHEL 8 with no **"kernelopts"** option in the `/boot/grub2/grubenv`. GRUB reads **"kernelopts"** option from grubenv file for boot entry **"root="**. If **"kernelopts"** option does not exist, **"root="** cannot get correct value. As a result, the initial boot sequence with initramfs does not mount the root filesystem and fails to start switch root.\n',
        more_info: '',
        impacted_systems_count: 282,
        reports_shown: true,
        rule_status: 'enabled',
        resolution_set: [
          {
            system_type: 105,
            resolution:
              'Red Hat recommends that you update the `grubenv` file.\n\n1. Create an initialized `grubenv` file.\n   ~~~\n   # grub2-editenv /boot/grub2/grubenv create\n   ~~~\n\n2. Copy the current `grub.cfg` file as a backup.\n  {{? pydata.boot_type == "BIOS"}}\n   ~~~\n   # cp /etc/grub2.cfg /root/grub2.cfg.copy\n   ~~~{{?}}\n  {{? pydata.boot_type == "UEFI"}}\n   ~~~\n   # cp /boot/efi/EFI/redhat/grub.cfg /root/grub.cfg.copy\n   ~~~\n  {{?}}\n\n3. Re-generate the `grub.cfg` file and the boot parameters are written into the `grubenv` file.\n  {{? pydata.boot_type == "BIOS"}}\n   ~~~\n   # grub2-mkconfig -o /etc/grub2.cfg\n   ~~~{{?}}\n  {{? pydata.boot_type == "UEFI"}}\n   ~~~\n   # grub2-mkconfig -o /boot/efi/EFI/redhat/grub.cfg\n   ~~~\n  {{?}}\n',
            resolution_risk: { name: 'Update Kernel Boot Options', risk: 3 },
            has_playbook: true,
          },
        ],
        total_risk: 4,
        hosts_acked_count: 0,
        rating: 1,
        pathway: {
          name: 'Update Kernel Boot Options',
          component: 'grub',
          resolution_risk: { name: 'Update Kernel Boot Options', risk: 3 },
        },
      },
      {
        rule_id: 'no_ept_panic_with_l1tf|NO_EPT_PANIC_WITH_L1TF',
        created_at: '2020-04-27T14:37:39.827643Z',
        updated_at: '2022-01-07T06:15:53.114089Z',
        description:
          'Kernel panic occurs due to a bug in the mitigation part of KVM for L1TF bug fix',
        active: true,
        category: { id: 3, name: 'Stability' },
        impact: { name: 'Kernel Panic', impact: 4 },
        likelihood: 4,
        node_id: '3570921',
        tags: 'cpu kernel panic sbr_kernel',
        playbook_count: 1,
        reboot_required: true,
        publish_date: '2018-12-11T01:35:00Z',
        summary:
          'Kernel panic occurs when the mitigation control for KVM is read or KVM guest is started on a system with L1TF mitigation without EPT support.\n',
        generic:
          'Kernel panic occurs when the mitigation control for KVM is read or KVM guest is started on a system with L1TF mitigation without EPT support.\n',
        reason:
          'This host is running **kernel-{{=pydata.kvra}}** with `kvm_intel` module loaded. The CPU model of this host is **{{=pydata.name}}** and the `EPT` feature {{?!pydata.has_ept}}is not supported on this CPU{{??}}{{?pydata.boot_disabled}}has been disabled{{?}}{{?}}.\nKernel panic can occur due to a bug in the mitigation control of KVM introduced by L1TF bug fix.\n',
        more_info:
          'For guidance on upgrading the kernel to a specific version, refer to [How do I upgrade the kernel to a particular version manually?](https://access.redhat.com/solutions/161803).\n',
        impacted_systems_count: 2,
        reports_shown: true,
        rule_status: 'enabled',
        resolution_set: [
          {
            system_type: 105,
            resolution:
              'Red Hat recommends that you perform the following steps:\n\n{{?pydata.cur_lock && pydata.rcm_locks}}\n* Unset the release lock.\n  ~~~\n  # subscription-manager release --unset\n  ~~~\n{{?}}\n\n{{?pydata.no_base &&\n  (pydata.cur_lock==null || (pydata.cur_lock && pydata.rcm_locks))}}\n* Enable the RHEL base repo:\n  ~~~\n  # subscription-manager repos --enable={{=pydata.no_base}}\n  ~~~\n  Note: To fix the issue in the base channel, you have to enable the base channel at first.\n{{?}}\n\n{{?pydata.cur_lock && pydata.req_repos && pydata.rcm_locks==null}}\n* {{?Object.keys(pydata.req_repos).length > 1}}Enable one of the following channels{{??}}Enable the following channel{{?}}:\n  ~~~\n  {{~pydata.req_repos:e}}# subscription-manager repos --enable={{=e}}\n  {{~}}\n  ~~~\n  Note: Red Hat only provides the resolution in the required channel{{?Object.keys(pydata.req_repos).length > 1}}s{{?}}. \n{{?}}\n* Upgrade the kernel to {{?pydata.kvra.indexOf("el7") != -1}}**3.10.0-951.el7**{{?}}{{?pydata.kvra.indexOf("el6") != -1}}**2.6.32-754.6.3.el6**{{?}} or later:\n  ~~~\n  # yum update kernel\n  ~~~\n* Reboot the system with the new kernel:\n  ~~~\n  # reboot\n  ~~~\n',
            resolution_risk: { name: 'Upgrade Kernel', risk: 3 },
            has_playbook: true,
          },
        ],
        total_risk: 4,
        hosts_acked_count: 0,
        rating: 0,
        pathway: {
          name: 'Upgrade Kernel',
          component: 'kernel',
          resolution_risk: { name: 'Upgrade Kernel', risk: 3 },
        },
      },
      {
        rule_id:
          'insights_client_core_collection|INSIGHTS_CORE_COLLECTION_OLD_PKG',
        created_at: '2021-03-18T11:45:58.432706Z',
        updated_at: '2022-05-03T11:45:52.865118Z',
        description:
          'When the Insights Client is earlier than "3.1.0", it is not able to get recommendations dependent on core collection',
        active: true,
        category: { id: 1, name: 'Availability' },
        impact: { name: 'Management Availability', impact: 2 },
        likelihood: 4,
        node_id: '5699071',
        tags: 'insights_client',
        playbook_count: 3,
        reboot_required: false,
        publish_date: '2021-03-13T18:48:00Z',
        summary:
          'The host is not able to get recommendations dependent on core collection.\n',
        generic:
          'Since the Insights Client version "3.1.0", a new feature named "core collection" is provided. Some new recommendations are dependent on the core collection. So, if Insights Client earlier than "3.1.0" is being used, it is not able to get the recommendations dependent on that new feature.\n',
        reason:
          'The Insights Client package **{{=pydata.pkg}}** installed on this host is old and the core collection feature is not available in that version. As a result, it is not able to get the recommendations dependent on the core collection.\n',
        more_info: '',
        impacted_systems_count: 856,
        reports_shown: true,
        rule_status: 'enabled',
        resolution_set: [
          {
            system_type: 105,
            resolution:
              '{{?pydata.cur_lock}}\nRed Hat recommends that you set **"core_collect=True"** in the `/etc/insights-client/insights-client.conf` file.\n\nAlternatively, since the current release **RHEL {{=pydata.cur_lock}}** set on\nthis host does not provide the package, there is no direct solution. Red Hat\nrecommends that you perform the following steps an alternative:\n1. Unset the minor release:\n  ~~~\n  # subscription-manager release --unset\n  ~~~\n{{?pydata.no_base}}\n1. Enable the RHEL base repo:\n  ~~~\n  # subscription-manager repos --enable={{=pydata.no_base}}\n  ~~~\n  Note: Red Hat only provides the package in the ``{{=pydata.no_base}}`` channel.\n{{?}}{{?pydata.old}}\n1. Uninstall the old package\n  ~~~\n  # yum remove redhat-access-insights\n  ~~~\n{{?}}\n1. {{?pydata.old}}Install{{??}}Update to{{?}} the latest package:\n  ~~~\n  # yum {{?pydata.old}}install{{??}}update{{?}} insights-client\n  ~~~\n{{??}}\nRed Hat recommends that you perform the following steps:\n{{?pydata.no_base}}\n* Enable the RHEL base repo:\n  ~~~\n  # subscription-manager repos --enable={{=pydata.no_base}}\n  ~~~\n  Note: Red Hat only provides the package in the ``{{=pydata.no_base}}`` channel.\n{{?}}{{?pydata.old}}\n* Uninstall the old package\n  ~~~\n  # yum remove redhat-access-insights\n  ~~~\n{{?}}\n* {{?pydata.old}}Install{{??}}Update to{{?}} the latest package:\n  ~~~\n  # yum {{?pydata.old}}install{{??}}update{{?}} insights-client\n  ~~~\n\n{{?pydata.cc_true}}\nAlternatively, if updating the package is not allowed, you can set **core_collect=True** in the `/etc/insights-client/insights-client.conf` file.\n{{?}}{{?}}\n',
            resolution_risk: { name: 'Update Package', risk: 1 },
            has_playbook: true,
          },
        ],
        total_risk: 3,
        hosts_acked_count: 10,
        rating: 0,
      },
    ],
  },
];

const getMock: ServiceCallFunction = () =>
  Promise.resolve({ data: advisorData });
const responseProcessor = (data: typeof advisorData) => data;

const advisorDescriptor: ServiceDescriptor = {
  templates: {
    advisor: {
      service: ServiceNames.demo,
      responseProcessor,
      path: '/',
      mock: getMock,
    },
  },
};

export default advisorDescriptor;
