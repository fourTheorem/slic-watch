module.exports = () => {
  const branches = []
  for (let i = 0; i < 30; i++) {
    const innerBranches = []
    for (let j = 0; j < 30; j++) {
      innerBranches.push({
        StartAt: `j${i}_${j}`,
        States: {
          [`j${i}_${j}`]: {
            Type: 'Pass',
            Next: `j${i}_${j}`
          }
        }
      })
    }

    branches.push({
      StartAt: `i${i}`,
      States: {
        [`i${i}`]: {
          Type: 'Parallel',
          End: true,
          Branches: innerBranches
        }
      }
    })
  }
  return {
    Type: 'Parallel',
    End: true,
    Branches: branches
  }
}
