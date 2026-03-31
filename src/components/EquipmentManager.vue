<template>
  <div class="equipment-manager">
    <div class="equipment-header">
      <h3>Equipment & Inventory</h3>
      <div>
        <button @click="showAddEquip = !showAddEquip" class="btn btn-secondary">
          {{ showAddEquip ? '✕ Cancel' : '➕ Add Equipment' }}
        </button>
      </div>
    </div>

    <div class="equipment-stats">
      <div class="stat-box">
        <label>Gold (gp)</label>
        <input 
          v-model.number="localGold" 
          @change="updateGold"
          type="number" 
          class="input-field"
          min="0"
        >
      </div>
      <div class="stat-box">
        <label>Total Encumbrance</label>
        <div class="encumbrance-value">{{ calculateEncumbrance() }} lbs</div>
      </div>
      <div class="stat-box">
        <label>Carrying Capacity</label>
        <div class="capacity">{{ getCarryingCapacity() }} lbs</div>
      </div>
    </div>

    <div v-if="showAddEquip" class="add-equipment-form">
      <input 
        v-model="newEquip.name" 
        type="text" 
        class="input-field"
        placeholder="Item name"
      >
      <input 
        v-model.number="newEquip.weight" 
        type="number" 
        class="input-field"
        placeholder="Weight (lbs)"
        min="0"
      >
      <input 
        v-model.number="newEquip.quantity" 
        type="number" 
        class="input-field"
        placeholder="Quantity"
        min="1"
      >
      <input 
        v-model="newEquip.notes" 
        type="text" 
        class="input-field"
        placeholder="Notes"
      >
      <button @click="addEquipment" class="btn btn-primary">Add</button>
    </div>

    <div class="equipment-list">
      <div v-if="character.equipment && character.equipment.length > 0">
        <div v-for="item in character.equipment" :key="item.id" class="equipment-item">
          <div class="item-info">
            <h4>{{ item.name }}</h4>
            <div class="item-details">
              <span>Qty: {{ item.quantity }}</span>
              <span>Weight: {{ item.weight * item.quantity }} lbs</span>
              <span v-if="item.notes">Notes: {{ item.notes }}</span>
            </div>
          </div>
          <div class="item-actions">
            <button @click="removeEquipment(item.id)" class="btn-remove">✕</button>
          </div>
        </div>
      </div>
      <div v-else class="empty">
        <p>No equipment added</p>
      </div>
    </div>

    <div class="common-equipment">
      <h4>Quick Add Equipment</h4>
      <div class="equipment-grid">
        <button v-for="item in commonEquipment" :key="item.name" @click="addCommonEquipment(item)" class="btn-equip">
          {{ item.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export const commonEquipment = [
  { name: 'Longsword', weight: 4, quantity: 1 },
  { name: 'Shield', weight: 6, quantity: 1 },
  { name: 'Backpack', weight: 5, quantity: 1 },
  { name: 'Rope (50ft)', weight: 5, quantity: 1 },
  { name: 'Torch', weight: 0.5, quantity: 10 },
  { name: 'Bedroll', weight: 5, quantity: 1 },
  { name: 'Waterskin', weight: 1, quantity: 1 },
  { name: 'Rations (1 day)', weight: 1, quantity: 10 },
  { name: 'Lantern', weight: 1, quantity: 1 },
  { name: 'Oil (1 pint)', weight: 1, quantity: 5 }
]

export default {
  name: 'EquipmentManager',
  props: {
    character: Object
  },
  data() {
    return {
      showAddEquip: false,
      localGold: 0,
      newEquip: {
        name: '',
        weight: 0,
        quantity: 1,
        notes: ''
      },
      commonEquipment
    }
  },
  watch: {
    character: {
      immediate: true,
      handler() {
        this.localGold = this.character.gold || 0
      }
    }
  },
  methods: {
    addEquipment() {
      if (!this.newEquip.name) {
        alert('Please enter equipment name')
        return
      }

      if (!this.character.equipment) {
        this.character.equipment = []
      }

      const equipment = {
        id: Date.now(),
        ...this.newEquip
      }

      this.character.equipment.push(equipment)
      this.$emit('update', { equipment: this.character.equipment })

      this.newEquip = { name: '', weight: 0, quantity: 1, notes: '' }
      this.showAddEquip = false
    },
    addCommonEquipment(item) {
      if (!this.character.equipment) {
        this.character.equipment = []
      }

      const equipment = {
        id: Date.now(),
        ...item
      }

      this.character.equipment.push(equipment)
      this.$emit('update', { equipment: this.character.equipment })
    },
    removeEquipment(id) {
      this.character.equipment = this.character.equipment.filter(e => e.id !== id)
      this.$emit('update', { equipment: this.character.equipment })
    },
    updateGold() {
      this.$emit('update', { gold: this.localGold })
    },
    calculateEncumbrance() {
      if (!this.character.equipment) return 0
      return this.character.equipment.reduce((total, item) => total + (item.weight * item.quantity), 0)
    },
    getCarryingCapacity() {
      const strStat = this.character.stats.STR || 10
      return strStat * 10
    }
  }
}
</script>

<style scoped>
.equipment-manager {
  background: var(--bg-dark);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.equipment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--primary);
}

.equipment-header h3 {
  margin: 0;
  color: var(--primary);
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-secondary {
  background: var(--accent-info);
  color: #fff;
}

.equipment-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.stat-box {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
  border-left: 3px solid var(--primary);
}

.stat-box label {
  display: block;
  color: var(--text-muted);
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.input-field {
  width: 100%;
  padding: 8px 12px;
  background: var(--bg-dark);
  border: 1px solid #444;
  color: var(--primary);
  border-radius: 4px;
}

.encumbrance-value, .capacity {
  color: var(--primary);
  font-size: 18px;
  font-weight: bold;
}

.add-equipment-form {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr auto;
  gap: 10px;
  align-items: flex-end;
}

.btn-primary {
  background: var(--primary);
  color: #000;
  padding: 8px 16px;
}

.equipment-list {
  margin-bottom: 20px;
}

.equipment-item {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 3px solid var(--primary);
}

.item-info h4 {
  margin: 0 0 8px 0;
  color: var(--primary);
}

.item-details {
  display: flex;
  gap: 15px;
  font-size: 12px;
  color: var(--text-muted);
}

.item-actions {
  display: flex;
  gap: 5px;
}

.btn-remove {
  padding: 6px 8px;
  background: var(--accent-error);
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.empty {
  text-align: center;
  padding: 30px;
  color: var(--text-muted);
}

.common-equipment {
  background: var(--bg-light);
  padding: 15px;
  border-radius: 4px;
}

.common-equipment h4 {
  margin: 0 0 15px 0;
  color: var(--primary);
  font-size: 13px;
}

.equipment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
}

.btn-equip {
  padding: 8px 12px;
  background: var(--bg-dark);
  border: 1px solid #444;
  color: var(--text);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 12px;
}

.btn-equip:hover {
  border-color: var(--primary);
  color: var(--primary);
}
</style>