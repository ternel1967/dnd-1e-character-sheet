<template>
  <div class="character-sheet">
    <div class="sheet-header">
      <div class="header-info">
        <h2>{{ character.name }}</h2>
        <p v-if="!character.isMulticlass">
          {{ character.subrace || character.race }} {{ character.classes[0].class }} - Level {{ character.level }}
        </p>
        <p v-else>
          {{ character.subrace || character.race }} 
          <span v-for="(cls, idx) in character.classes" :key="idx">
            {{ cls.class }} <strong>{{ cls.level }}</strong><span v-if="idx < character.classes.length - 1"> / </span>
          </span>
        </p>
      </div>
      <div class="header-actions">
        <button @click="activeTab = 'stats'" :class="['tab-btn', { active: activeTab === 'stats' }]">
          Stats
        </button>
        <button @click="activeTab = 'combat'" :class="['tab-btn', { active: activeTab === 'combat' }]">
          Combat
        </button>
        <button @click="activeTab = 'skills'" :class="['tab-btn', { active: activeTab === 'skills' }]">
          Skills
        </button>
        <button @click="activeTab = 'equipment'" :class="['tab-btn', { active: activeTab === 'equipment' }]">
          Equipment
        </button>
      </div>
    </div>

    <!-- Rest of template stays the same -->
    ...

    <!-- Stats Tab -->
    <div v-if="activeTab === 'stats'" class="tab-content">
      <AbilityScores :character="character" @update="$emit('update', $event)" />
      <ExperienceTracker :character="character" @update="$emit('update', $event)" />
    </div>

    <!-- Combat Tab -->
    <div v-if="activeTab === 'combat'" class="tab-content">
      <CombatStats :character="character" @update="$emit('update', $event)" />
      <DiceRoller />
    </div>

    <!-- Skills Tab -->
    <div v-if="activeTab === 'skills'" class="tab-content">
      <SkillTracker :character="character" @update="$emit('update', $event)" />
    </div>

    <!-- Equipment Tab -->
    <div v-if="activeTab === 'equipment'" class="tab-content">
      <EquipmentManager :character="character" @update="$emit('update', $event)" />
    </div>
  </div>
</template>

<script>
import AbilityScores from './AbilityScores.vue'
import ExperienceTracker from './ExperienceTracker.vue'
import CombatStats from './CombatStats.vue'
import DiceRoller from './DiceRoller.vue'
import SkillTracker from './SkillTracker.vue'
import EquipmentManager from './EquipmentManager.vue'

export default {
  components: {
    AbilityScores,
    ExperienceTracker,
    CombatStats,
    DiceRoller,
    SkillTracker,
    EquipmentManager
  },
  props: {
    character: Object
  },
  data() {
    return {
      activeTab: 'stats'
    }
  }
}
</script>

<style scoped>
.character-sheet {
  background: var(--bg-light);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.sheet-header {
  background: linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-light) 100%);
  border-bottom: 2px solid var(--primary);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-info h2 {
  margin: 0 0 5px 0;
  color: var(--primary);
}

.header-info p {
  margin: 0;
  color: var(--text-muted);
  font-size: 14px;
}

.header-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 8px 16px;
  background: var(--bg-dark);
  border: 1px solid #444;
  color: var(--text-muted);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.tab-btn:hover {
  border-color: var(--primary);
  color: var(--text);
}

.tab-btn.active {
  background: var(--primary);
  color: #000;
  border-color: var(--primary);
}

.tab-content {
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>