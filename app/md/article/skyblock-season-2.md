# Skyblock Season 2.0 Changelog

Author: Sam (Founder of Static Studios)

## Economy Changes

- Massively changed the economy for better longevity.
- Added a hopper limit island upgrade.
- Added a dispenser limit island upgrade.
- Reduced the amount of tokens given from `/salvage`.
- Overhauled crate rewards.
- Buffed skill rewards.
- Added 50 additional levels to each skill. (max level 150)
- Changed farming skill leveling. Different crops now give more skill XP.
- Increased the difficulty of skill leveling.
- Decreased `TNT Spawner` upgrade pricing. (money)
- Increased max `TNT Spawner` limit. (3 -> 5)
- Decreased `Generator Limit` upgrade pricing. (money & island points)
- Increased `Generator Limit` default. (0 -> 1)
- Altered other island upgrades for an improved economy.
- Decreased the cost of generator upgrades across the board.
- Nerfed island value generators.
- The island mining quest line will now count blocks mined at the `/mine`.
- Altered challenges.

## Warzones

- Added "Causal Warzone"
    - Fight enemies to level up your `Grinding Skill` and obtain rare loot.
- Added "Competitive Warzone"
    - Fight enemies to level up your `Grinding Skill` and obtain rare loot.
    - PvP is enabled here. If you die, you will lose everything.
    - Added events such as `King of the Hill` and `Supply Drops`.
    - Added a warzone outpost. Capture the outpost to earn **__ALL OF THE FOLLOWING BUFFS:__** `+25% Sell Multiplier`,
      `+25% Token Multiplier`, `+25% Experience Multiplier` & `+25% Skill XP Multiplier`.

## Dungeons

- Dungeons are a series of infinitely generating rooms which contain enemies and loot.
- The further you go, the more difficult the enemies become, but the more loot you'll find.
- Dungeons contain rare items and dungeon shards.
    - Dungeon shards can be used to upgrade your gear for future dungeon runs.
    - Dungeon shards will have another, important use, in the near future.
- You may start a dungeon with up to four other players.
- Start a dungeon with a dungeon key.
    - Dungeon keys can be found in the warzone and in the crates.
    - Dungeon keys are available for purchase on our [store](https://staticstudios.net/store/dungeon-keys)
- A dungeon boss will be spawned every 5 rounds.
    - You may exit the dungeon via a spawn poral after successfully killing the boss.
        - If you die in the dungeon, you will not bring any of your loot with you.
        - You will bring your loot and shards with you when you exit via a spawn portal

## Enchantments

- Added "Overclock" enchantment to helmets. Increases your mining speed. Allows for insta-mining blocks in the `/mine`
  when used in conjunction with efficiency 5 & momentum 3.
- Added "Ignite" enchantment. Ignite nearby mobs on fire. This enchantment only works in the `/warzone`.
- Added "Dark Knight" enchantment. Summon a swarm of angry bats to attack your enemies. This enchantment only works in
  the `/warzone`.
- Added "Zeus" enchantment. Strike your enemies with lightning. This enchantment only works in the `/warzone`.
- Added "Freeze" enchantment. Freeze your enemies in place. This enchantment only works in the `/warzone`.
- Added "Life Steal" enchantment. Steal health from your enemies. This enchantment only works in the `/warzone`.
- Added "Infected" enchantment. Infect your enemies with poison. This enchantment only works in the `/warzone`.
- Added "Reclaim" enchantment. Chance to refill your health after killing another player (5% per level)
- Added "Fire Aspect" enchantment. Light your enemies on fire.
- Added "Knockback" enchantment. Push your enemies away.
- Added "Protection" enchantment. Reduce damage taken from all sources.
- Added "Feather Falling" enchantment. Reduce fall damage.
- Added "Punch" enchantment. Increase arrow knockback.
- Added "Power" enchantment. Increase arrow damage.
- Added "Flame" enchantment. Light your arrows on fire.
- Removed "Bane of Arthropods" enchantment.
- Removed "Smite" enchantment.
- Buffed the majority of enchants to improve proc rates.

## Loot Pools

- Find better items throughout Skyblock as your island's level increases.
- View your loot pools with `/is lootpool`.
- Added "Spawner Loot Pool"
    - Find better spawners.
- Added "Island Value Loot Pool"
    - Find better island value blocks.

## Virtual Gift Card Balance

- You can redeem gift cards in game to your virtual gift card balance or withdraw them to create a gift card code to use
  on our store.
- View your balance with `/gc` or `/gc balance`.
- Create a gift card with `/gc withdraw <amount>`.
- Redeem a gift card with `/gc redeem <code>`.
- Pay someone GC with `/gc pay <player> <amount>`.
- View your transaction history with `/gc history`.

## Coin Flip

- Added the long awaited `/coinflip`s.
- Create a coin flip with `/cf create <currency> <amount>`.
- Challenge a certain player to a coin flip with `/cf create <currency> <amount> <player>`.
- View and challenge coin flips with `/cf`.
- Cancel your coinflip with `/cf cancel`.
- View your coin flip statistics with `/cf` > `Statistics`.

## Minion Changes

- Changed minions to drop the items.
- Changed "Mining Minion":
    - Added "Fortune" upgrade:  Increase how many items this minion drops.
- Added a "Farming Minion":
    - Farm nearby crops whilst generating tokens an xp.
    - Upgrades:
        - Range: Increase the distance that this minion can harvest crops within.
        - Fortune: Increase how many items this minion drops.
        - Storage: Increase how many tokens and xp can be stored in this minion.
- Removed minions from the token shop.
- Added random minion items to the token shop.

## Kit Changes

- Added `/kit islander`
- Added `/kit architect`
- Added `/kit champion`
- Added `/kit emperor`
- Added `/kit static`

## Island Warp Changes

- Added the ability to move an existing warp with `/is warp move <warp>`.
- Added more warp icons to choose from.
- Changed island warp related menus to have a better UX.

## TNT Spawner Changes

- TNT spawners no longer spawn TNT every 5 seconds, they can spawn TNT the instant they are powered. This allows for
  more deterministic behavior.
- TNT Spawners can spawn TNT at a max rate of once per second. You can put them on a redstone clock or you can keep them
  powered for them to run at their max rate.

## Other Changes

- Redstone and fluids no longer freeze when an island is unloaded.
- Added support for pick block with custom blocks.
- After purchasing your pet's first upgrade it will automatically be applied.
- Fixed a bug causing chicken jockeys to spawn from zombie spawners.
- Added a "Copper Mine"
- Added an "Emerald Mine"
- Added "Token Booster" item.
- Added "Experience Booster" item.
- Added `/activeboosts` command to view active boost/skill boosts.
- Added additional tutorial levels.
- Changed `/kit starter` tools to iron.
- Fixed numerous issues resulting in flight inconsistencies.
- Fixed an issue causing pet's to linger after the player has left.
- Rename "Island Points" -> "Island Upgrades" in the island menu.
- Changed rank name formatting.