import { ProfileInterface, ComplianceSystemsInterface } from './interfaces';

export const NEVER = 'Never';
export const SEVERITY_LEVELS = ['high', 'medium', 'low', 'unknown'];

export const fixedPercentage = (
  value: number,
  fixed = 0,
  withPercent = true
) => {
  const fixedValue = value
    ? parseFloat(value.toString()).toFixed(fixed)
    : undefined;
  return fixedValue ? fixedValue + (withPercent ? '%' : '') : 'N/A';
};

export const profilesRulesFailed = (profiles: ProfileInterface[]) =>
  profiles.flatMap(
    (profile) =>
      profile.rules && profile.rules.filter((rule) => !rule.compliant)
  );

export const profilesRulesPassed = (profiles: ProfileInterface[]) =>
  profiles.flatMap(
    (profile) => profile.rules && profile.rules.filter((rule) => rule.compliant)
  );

export const systemRulesPassed = (system: ComplianceSystemsInterface) => {
  return system.testResultProfiles
    ? profilesRulesPassed(system.testResultProfiles)
    : [];
};

export const systemRulesFailed = (system: ComplianceSystemsInterface) =>
  system.testResultProfiles
    ? profilesRulesFailed(system.testResultProfiles)
    : [];

export const systemSupportedByProfiles = (profiles: ProfileInterface[]) =>
  profiles.reduce((acc, profile) => acc && !!profile.supported, true);

export const systemsWithRuleObjectsFailed = (
  systems: ComplianceSystemsInterface[]
) =>
  systems.map((system) => ({
    ...system,
    ruleObjectsFailed: systemRulesFailed(system),
    supported: systemSupportedByProfiles(system.testResultProfiles),
    profiles: system.testResultProfiles,
  }));

export const toRulesArrayWithProfile = (
  profilesWithRules: ProfileInterface[]
) =>
  profilesWithRules.flatMap((profileWithRules) =>
    profileWithRules.rules.map((rule) => {
      const identifier = rule.identifier && JSON.parse(rule.identifier);
      return {
        ...rule,
        identifier: identifier && identifier.label ? identifier : null,
        profile: profileWithRules,
      };
    })
  );

export const complianceScoreData = (profiles: ProfileInterface[]) => {
  const scoreTotal = profiles.reduce((acc, profile) => acc + profile.score, 0);
  const rulesPassed = profilesRulesPassed(profiles).length;
  const rulesFailed = profilesRulesFailed(profiles).length;
  const numScored = profiles.reduce((acc, profile) => {
    if (
      profilesRulesPassed([profile]).length +
        profilesRulesFailed([profile]).length >
      0
    ) {
      return acc + 1;
    }

    return acc;
  }, 0);
  const score = numScored ? scoreTotal / numScored : 0;
  const compliant = profiles.every(
    (profile) => profile.lastScanned === NEVER || profile.compliant === true
  );

  return {
    score,
    rulesPassed,
    rulesFailed,
    compliant,
    supported: systemSupportedByProfiles(profiles),
  };
};
