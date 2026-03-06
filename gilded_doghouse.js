/*
After reading up about design patterns, 
I've decided to use a strategy pattern to handle the update logic.

I removed the earlier implmentation of if else chain because it 
does not scale well and violates single responsibility principle.

The strategy-object approach is good for this problem(according to me): 
it cleanly separates each item's behavior, keeps shared logic in one place

But in case of more items, it would be better to use a 
subclass or external registry.
*/

const MIN_QUALITY = 0
const MAX_QUALITY = 50
class GildedDoghouse {
  constructor ({ name, daysRemaining, quality }) {
    this.name = name
    this.daysRemaining = daysRemaining
    this.quality = quality
  }

  updateStrategy = {
    "Normal item": {
      update(item) {
        item.quality -= item.daysRemaining < 0 ? 2 : 1
      },
    },
    "Aged Bone": {
      update(item) {
        if (item.daysRemaining < 0) {
          item.quality += 2
        } else {
          item.quality += 1
        }
      },
    },
    "Coursedog Mascot": {
      decrementDays: false,
      rangeQuality: false,
      update() {},
    },
    "Training Session": {
      update(item) {
        if (item.daysRemaining < 0) {
          item.quality = 0
        } else if (item.daysRemaining < 5) {
          item.quality += 3
        } else if (item.daysRemaining < 10) {
          item.quality += 2
        } else {
          item.quality += 1
        }
      },
    },
    "Beef Cake": {
      update(item) {
        if (item.daysRemaining < 0) {
          item.quality -= 4
        } else {
          item.quality -= 2
        }
      },
    },
  };

  tick() {
    const strategy = this.updateStrategy[this.name]
    if (!strategy) return
    if (strategy.decrementDays !== false) this.daysRemaining -= 1
    strategy.update(this)
    if (strategy.rangeQuality !== false) this.quality = Math.max(MIN_QUALITY, Math.min(MAX_QUALITY, this.quality))
  }
}

module.exports = GildedDoghouse
