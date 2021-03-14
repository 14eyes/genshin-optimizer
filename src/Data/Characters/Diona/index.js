import card from './Character_Diona_Card.png'
import thumb from './Character_Diona_Thumb.png'
import c1 from './Constellation_A_Lingering_Flavor.png'
import c2 from './Constellation_Shaken,_Not_Purred.png'
import c3 from './Constellation_A-Another_Round_.png'
import c4 from './Constellation_Wine_Industry_Slayer.png'
import c5 from './Constellation_Double_Shot,_On_The_Rocks.png'
import c6 from './Constellation_Cat\'s_Tail_Closing_Time.png'
import normal from './Talent_Kätzlein_Style.png'
import skill from './Talent_Icy_Paws.png'
import burst from './Talent_Signature_Mix.png'
import passive1 from './Talent_Cat\'s_Tail_Secret_Menu.png'
import passive2 from './Talent_Drunkards\'_Farce.png'
import passive3 from './Talent_Complimentary_Bar_Food.png'
import Stat from '../../../Stat'
import formula, { data } from './data'
import { getTalentStatKey, getTalentStatKeyVariant } from '../../../Build/Build'

const char = {
  name: "Diona",
  cardImg: card,
  thumbImg: thumb,
  star: 4,
  elementKey: "cryo",
  weaponTypeKey: "bow",
  gender: "F",
  constellationName: "Feles",
  titles: ["Kätzlein Cocktail", "Wine Industry Slayer (Self-proclaimed)"],
  baseStat: data.baseStat,
  specializeStat: data.specializeStat,
  formula, talent: {
    auto: {
      name: "Strike of Fortune",
      img: normal,
      infusable: false,
      document: [{
        text: <span><strong>Normal Attack</strong> Performs up to 5 rapid strikes.</span>,
        fields: data.normal.hitArr.map((percentArr, i) =>
        ({
          text: `${i + 1}-Hit DMG`,
          formulaText: (tlvl, stats) => <span>{percentArr[tlvl]}% {Stat.printStat(getTalentStatKey("normal", stats), stats)}</span>,
          formula: formula.normal[i],
          variant: (tlvl, stats) => getTalentStatKeyVariant("normal", stats),
        }))
      }, {
        text: <span><strong>Charged Attack</strong> Perform a more precise Aimed Shot with increased DMG. While aiming, biting frost will accumulate on the arrowhead. A fully charged frost arrow will deal Cryo DMG.</span>,
        fields: [{
          text: `Aimed Shot`,
          formulaText: (tlvl, stats) => <span>{data.charged.aimedShot[tlvl]}% {Stat.printStat(getTalentStatKey("charged", stats), stats)}</span>,
          formula: formula.charged.aimedShot,
          variant: (tlvl, stats) => getTalentStatKeyVariant("charged", stats),
        }, {
          text: `Fully-Charged Aimed Shot`,
          formulaText: (tlvl, stats) => <span>{data.charged.fullAimedShot[tlvl]}% {Stat.printStat(getTalentStatKey("charged", stats), stats)}</span>,
          formula: formula.charged.fullAimedShot,
          variant: (tlvl, stats) => getTalentStatKeyVariant("charged", stats, true),
        }]
      }, {
        text: <span><strong>Plunging Attack</strong> Fires off a shower of arrows in mid-air before falling and striking the ground, dealing AoE DMG upon impact.</span>,
        fields: [{
          text: `Plunge DMG`,
          formulaText: (tlvl, stats) => <span>{data.plunging.dmg[tlvl]}% {Stat.printStat(getTalentStatKey("plunging", stats), stats)}</span>,
          formula: formula.plunging.dmg,
          variant: (tlvl, stats) => getTalentStatKeyVariant("plunging", stats),
        }, {
          text: `Low Plunge DMG`,
          formulaText: (tlvl, stats) => <span>{data.plunging.low[tlvl]}% {Stat.printStat(getTalentStatKey("plunging", stats), stats)}</span>,
          formula: formula.plunging.low,
          variant: (tlvl, stats) => getTalentStatKeyVariant("plunging", stats),
        }, {
          text: `High Plunge DMG`,
          formulaText: (tlvl, stats) => <span>{data.plunging.high[tlvl]}% {Stat.printStat(getTalentStatKey("plunging", stats), stats)}</span>,
          formula: formula.plunging.high,
          variant: (tlvl, stats) => getTalentStatKeyVariant("plunging", stats),
        }]
      }],
    },
    skill: {
      name: "Icy Paws",
      img: skill,
      document: [{
        text: <span>
          <p className="mb-2">Fires an Icy Paw that deals <span className="text-cryo">Cryo DMG</span> to opponents and forms a shield on hit. The shield's DMG Absorption scales based on Diona's Max HP, and its duration scales off the number of Icy Paws that hit their target.</p>
          <p className="mb-2"><b>Press:</b> Rapidly fires off 2 Icy Paws.</p>
          <p className="mb-2"><b>Hold:</b> Charges up, resulting in different effects when unleashed based on the Charge Level</p>
          <ul className="mb-2">
            <li>Dashes back quickly before firing five Icy Paws.</li>
            <li>The shield created by a Hold attack will gain a 75% DMG Absorption Bonus.</li>
            <li>The shield has a 250% <span className="text-cryo">Cryo DMG</span> Absorption Bonus, and will cause your active character to become affected by <span className="text-cryo">Cryo</span> at the point of formation for a short duration.</li>
          </ul>
        </span>,
        fields: [{
          text: "Icy Paw DMG",
          formulaText: (tlvl, stats) => <span>{data.skill.paw[tlvl]}%{stats.constellation >= 2 ? " + 15%" : ""} {Stat.printStat(getTalentStatKey("burst", stats), stats)}</span>,
          formula: formula.skill.paw,
          variant: (tlvl, stats) => getTalentStatKeyVariant("skill", stats)
        }, {
          text: "Shiled DMG Absorption",
          formulaText: (tlvl, stats) => <span>{data.skill.shieldHP[tlvl]}%{stats.constellation >= 2 ? " + 15%" : ""} {Stat.printStat("finalHP", stats)} + {data.skill.shieldHPFlat[tlvl]}</span>,
          formula: formula.skill.shield,
        }, {
          text: "Hold Shiled DMG Absorption",
          formulaText: (tlvl, stats) => <span>{data.skill.shieldHP[tlvl]}%{stats.constellation >= 2 ? " + 15%" : ""} {Stat.printStat("finalHP", stats)} + {data.skill.shieldHPFlat[tlvl]}</span>,
          formula: formula.skill.shieldhold,
        }]
      }],
    },
    burst: {
      name: "Signature Mix",
      img: burst,
      document: [{
        text: <span>
          <p className="mb-2">Tosses out a special cold brew that deals <span className="text-cryo">AoE Cryo DMG</span> and creates a Drunken Mist in an AoE.</p>
          <p className="mb-2"><b>Drunken Mist:</b></p>
          <ul className="mb-2">
            <li>Deals continuous <span className="text-cryo">Cryo DMG</span> to opponents within the AoE.</li>
            <li>Continuously regenerates the HP of characters within the AoE.</li>
          </ul>
        </span>,
        fields: [{
          text: "Skill DMG",
          formulaText: (tlvl, stats) => <span>{data.burst.dmg[tlvl]}% {Stat.printStat(getTalentStatKey("burst", stats), stats)}</span>,
          formula: formula.burst.dmg,
          variant: (tlvl, stats) => getTalentStatKeyVariant("burst", stats),
        }, {
          text: "Continuous Field DMG",
          formulaText: (tlvl, stats) => <span>{data.burst.cdmg[tlvl]}% {Stat.printStat(getTalentStatKey("burst", stats), stats)}</span>,
          formula: formula.burst.cdmg,
          variant: (tlvl, stats) => getTalentStatKeyVariant("burst", stats),
        }, {
          text: "Continuous Regeneration Per Sec",
          formulaText: (tlvl, stats) => <span>( {data.burst.healHP[tlvl]}% Max HP + {data.burst.healHPFlat[tlvl]} ) * {Stat.printStat("heal_multi", stats)}</span>,
          formula: formula.burst.regen,
          variant: "success",
        }, {
          text: "Duration",
          value: "12s",
        }, {
          text: "CD",
          value: "20s",
        }, {
          text: "Energy Cost",
          value: 80,
        }]
      }],
    },
    passive1: {
      name: "Cat's Tail Secret Menu",
      img: passive1,
      document: [{ text: <span>Characters shielded by Icy Paws have their Movement SPD increased by 10% and their Stamina Consumption decreased by 10%.</span> }],
    },
    passive2: {
      name: "Drunkards' Farce",
      img: passive2,
      document: [{ text: <span>Opponents who enter the AoE of Signature Mix have 10% decreased ATK for 15s.</span> }],
    },
    passive3: {
      name: "Complimentary Bar Food",
      img: passive3,
      document: [{ text: <span>When a Perfect Cooking is achieved on a dish with restorative effects, there is a 12% chance to obtain double the product.</span> }],
    },
    constellation1: {
      name: "A Lingering Flavor",
      img: c1,
      document: [{ text: <span>Regenerates 15 Energy for Diona after the effects of Signature Mix end.</span> }],
    },
    constellation2: {
      name: "Shaken, Not Purred",
      img: c2,
      document: [{
        text: <span>Increases Icy Paws' DMG by 15%, and increases its shield's DMG Absorption by 15%. Additionally, when paws hit their targets, creates a shield for other nearby characters on the field with 50% of the Icy Paws shield's DMG Absorption for 5s.</span>
      }]
    },
    constellation3: {
      name: "A—Another Round?",
      img: c3,
      document: [{ text: <span> Increases the Level of <b>Signature Mix</b> by 3. Maximum upgrade level is 15.</span> }],
      talentBoost: { burst: 3 }
    },
    constellation4: {
      name: "Wine Industry Slayer",
      img: c4,
      document: [{ text: <span>Within the radius of <b>Signature Mix</b>, Diona's charge time for aimed shots is reduced by 60%</span> }],
    },
    constellation5: {
      name: "Double Shot, On The Rocks",
      img: c5,
      document: [{ text: <span>Increases the Level of <b>Icy Paws</b> by 3. Maximum upgrade level is 15.</span> }],
      talentBoost: { skill: 3 }
    },
    constellation6: {
      name: "Cat's Tail Closing Time",
      img: c6,
      document: [{
        text: <span>Characters within Signature Mix's radius will gain the following effects based on their HP amounts:
          <ul className="mb-2">
            <li>Increases Incoming Healing Bonus by 30% when HP falls below or is equal to 50%.</li>
            <li>Elemental Mastery increased by 200 when HP is above 50%.</li>
          </ul>
        </span>
      }],
    }
  },
};
export default char;
