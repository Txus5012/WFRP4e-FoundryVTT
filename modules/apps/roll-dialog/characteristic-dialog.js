import CharacteristicTest from "../../system/rolls/characteristic-test";
import RollDialog from "./roll-dialog";

export default class CharacteristicDialog extends RollDialog {

    testClass = CharacteristicTest

    static get defaultOptions() {
        const options = super.defaultOptions;
        options.classes = options.classes.concat(["characteristic-roll-dialog"]);
        return options;
    }

    get item()
    {
      return this.characteristic
    }

    get characteristic() 
    {
      return this.data.characteristic;
    }


    static async setup(fields={}, data={}, options={})
    {
        options.title = options.title || game.i18n.format("CharTest", {char: game.wfrp4e.config.characteristics[data.characteristic]});
        options.title += options.appendTitle || "";

        return new Promise(resolve => {
            new this(fields, data, resolve, options).render(true);
        })
    }

    
    computeFields() {
        super.computeFields();

        if (this.options.dodge && this.actor.isMounted) {
            this.fields.modifier -= 20
            this.tooltips.addModifier(-20, game.i18n.localize("EFFECT.DodgeMount"));
        }
    }


    _computeDefending(attacker)
    {
        if (attacker.test.item.properties?.flaws.slow) {
            if (!game.settings.get("wfrp4e", "mooQualities") && options.dodge) 
            {
                this.fields.slBonus += 1
                this.tooltips.addSLBonus(1, game.i18n.localize('CHAT.TestModifiers.SlowDefend'));
            }
        }

    }
    
    _defaultDifficulty() 
    {
        let difficulty = super._defaultDifficulty();
        if (this.options.corruption || this.options.mutate)
        {
            difficulty = "challenging"
        }

        if (this.options.rest || this.options.income)
        {
            difficulty =  "average"
        }
        return difficulty;
    }

    // Backwards compatibility for effects
    get type() 
    {
        return "characteristic";
    }
}