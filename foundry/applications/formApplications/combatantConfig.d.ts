/**
 * Configure or create a single Combatant within a Combat entity.
 */
declare class CombatantConfig extends FormApplication {
  /**
   * @defaultValue
   * ```typescript
   * mergeObject(super.defaultOptions, {
   *   id: "combatant-config",
   *   title: game.i18n.localize("COMBAT.CombatantConfig"),
   *   classes: ["sheet", "combat-sheet"],
   *   template: "templates/sheets/combatant-config.html",
   *   width: 420
   * });
   * ```
   */
  static get defaultOptions(): FormApplication.Options;

  /**
   * @override
   */
  get title(): string;

  /**
   * @param event - (unused)
   * @override
   */
  protected _updateObject(event: Event, formData: CombatantConfig.FormData): Promise<Combat.Combatant>;
}

declare namespace CombatantConfig {
  interface FormData {
    defeated: boolean;
    hidden: boolean;
    img: string;
    initiative: number | null;
    name: string;
  }
}
