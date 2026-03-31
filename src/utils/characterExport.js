export function exportCharacterToJSON(character) {
  const json = JSON.stringify(character, null, 2)
  downloadFile(json, `${character.name}.json`, 'application/json')
}

export function exportCharacterToCSV(character) {
  let csv = 'Character Sheet Export\n'
  csv += `Name,${character.name}\n`
  csv += `Race,${character.race} (${character.subrace})\n`
  
  if (character.isMulticlass) {
    csv += `Classes,"${character.classes.map(c => `${c.class} ${c.level}`).join(', ')}"\n`
  } else {
    csv += `Class,${character.classes[0].class}\n`
  }
  
  csv += `Level,${character.level}\n`
  csv += `Experience,${character.experience}\n`
  csv += `Hit Points,${character.hitPoints}/${character.maxHitPoints}\n`
  csv += `Armor Class,${character.armorClass}\n`
  csv += `Gold,${character.gold}\n`
  csv += `Alignment,${character.alignment}\n\n`
  
  csv += 'Ability Scores\n'
  csv += 'Ability,Score,Modifier\n'
  Object.entries(character.stats).forEach(([ability, score]) => {
    const mod = Math.floor((score - 10) / 2)
    csv += `${ability},${score},${mod > 0 ? '+' : ''}${mod}\n`
  })
  
  csv += '\nEquipment\n'
  csv += 'Item,Quantity,Weight\n'
  if (character.equipment && character.equipment.length > 0) {
    character.equipment.forEach(item => {
      csv += `${item.name},${item.quantity},${item.weight * item.quantity}\n`
    })
  }
  
  csv += '\nSkills\n'
  csv += 'Skill,Ability,Bonus\n'
  if (character.skills && character.skills.length > 0) {
    character.skills.forEach(skill => {
      csv += `${skill.name},${skill.linkedAbility},${skill.bonus}\n`
    })
  }
  
  downloadFile(csv, `${character.name}.csv`, 'text/csv')
}

export function importCharacterFromJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const character = JSON.parse(event.target.result)
        resolve(character)
      } catch (error) {
        reject(new Error('Invalid JSON file'))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}

function downloadFile(content, filename, type) {
  const element = document.createElement('a')
  element.setAttribute('href', `data:${type};charset=utf-8,${encodeURIComponent(content)}`)
  element.setAttribute('download', filename)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

export function generateCharacterPDF(character) {
  // This is a placeholder - PDF generation would require a library like jsPDF
  alert('PDF export would require additional library. JSON and CSV export available.')
}