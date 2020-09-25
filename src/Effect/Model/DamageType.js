export const DamageType = {
    newDamageType: (params = {damageType: "Bludgeoning", preciousMaterials: "None"}) => {
        return { damageType: params.damageType, preciousMaterials: params.preciousMaterials };
    }
}