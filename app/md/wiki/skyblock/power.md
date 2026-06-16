# Power Cables

Cables are used to connect machinery around your island. While not exhaustive, some of the core components that
may be connected to cables are: power generators, wireless transmitters, tnt spawners, etc...

When looking at a cable, its respective network's load and capacity will be displayed in the following format on your
actionbar: `load/capacity`.

When a network's load exceeds its capacity, none of the machines on the network will be powered. Either everything
works, or nothing works. In the case of a network with a load smaller than its capacity, its cables will be illuminated
with
a red
color to signal that the network is properly configured.

![img.png](/image/md/wiki/skyblock/power/powercable.png)

---

# Power Switches

Power switches are used to dynamically connect and disconnect different parts of a network. Power switches have two
sides. Both sides can be connected to via a cable. When powered by redstone, the switch will connect the cables at each
end. When not powered by redstone, the cables at either end of the switch will not be connected to each other. Assuming
that nothing else connects the networks at either end of the switch, the two networks will be completely independent of
each
other when the switch is turned off. Power switches do not add any additional load to a network.
Power switches can be crafted in a workbench's power section.

![img.png](/image/md/wiki/skyblock/power/powerswitches.png)

---

# Power Generators

The use of Power Generators is the only way to increase a power network's capacity. Power Generators require a special
resource called **Essence** in order to function. Essence can be obtained by killing enemies in the `/warzone`. To add
Essence to a Power Generator, right-click the generator block and put the Essence in its inventory. There are five tiers
of Power Generators. Each tier has a higher power output than the last. Each tier consumes Essence at a different rate;
higher tiers consume Essence quicker.

![img.png](/image/md/wiki/skyblock/power/powergenerators.png)

#### Power Generator Recipe:

You can obtain power generators by crafting them in the [workbench](/wiki/skyblock/workbench). Every tier above tier one
has a crafting recipe which requires the previous tier, as well as other components.

![img.png](/image/md/wiki/skyblock/power/craftingrecipe.png)

#### Power Generator Limit:

The number of Power Generators you can place on your island can be increased through `/island upgrades`. Each upgrade
adds additional generator slot(s), allowing you to place more generators as your island grows.

Power Generators do not all need to be connected to the same network or placed in the same area. They can be spread out
across your island, as long as they are properly connected to the machines they are powering and have enough Essence to
run.

![generatorlimit.png](/image/md/wiki/skyblock/power/generatorlimit.png)

---

# Wireless Transmitters

Wireless Transmitters are used to power nearby blocks without needing to connect them directly with cables. Only certain
items require wireless power. Items requiring wireless power have something like `Power Requirement: 5W (Wireless)` in
their description. Wireless Transmitters must be connected to a powered network in order to function.

Transmitters can be placed facing either upward or downward, depending on how you want to set up your island.

![img.png](/image/md/wiki/skyblock/power/transmitter.png)

Wireless Transmitters have five tiers. Higher tiers have a larger radius, allowing them to power blocks from farther
away. Wireless Transmitters are mainly used to power spawners and robots within their range.

Instead of being limited by spawner type, your setup is limited by the total amount of power your network can provide.

#### Transmitter Use

Each spawner requires a certain amount of power to function. If the total power required by your spawners is higher than
your network’s capacity, only part of your setup will be powered. Unlike wired networks, in the case where the load of
all items within a Wireless Transmitter's radius exceeds the network's capacity: part of the wireless items will be
powered. Wireless networks are not all or nothing like their wired counterpart.

For example, if your spawners require 1,000W but your network only provides 500W, only 500W worth of spawners will work.

Wireless Transmitters are also used to power robots within their radius. Robots require power in order to function, and
they can only receive power through a Wireless Transmitter.

![img.png](/image/md/wiki/skyblock/power/transmitteruse.png)

#### Transmitter Recipe:

Wireless Transmitters can be crafted in the [workbench](/wiki/skyblock/workbench). Every tier above Tier 1 requires the
previous tier transmitter, along with additional crafting components.

![img.png](/image/md/wiki/skyblock/power/transmitterrecipe.png)