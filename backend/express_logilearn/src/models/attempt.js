const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Attempt {
  // Get all attempts with related data
  static async getAllAttempts() {
    try {
      const attempts = await prisma.attempts.findMany({
        include: {
          levels: {
            include: {
              sections: true,
              soals: true
            }
          },
          pelajars: true,
          jawaban_pgs: {
            include: {
              opsis: {
                include: {
                  soals: true
                }
              }
            }
          },
          jawaban_esais: {
            include: {
              soals: true,
              admins: true
            }
          }
        },
        orderBy: {
          id: 'desc'
        }
      });
      return attempts;
    } catch (error) {
      throw error;
    }
  }

  // Get attempt by ID
  static async getAttemptById(id) {
    try {
      const attempt = await prisma.attempts.findUnique({
        where: { id: parseInt(id) },
        include: {
          levels: {
            include: {
              sections: true
            }
          },
          pelajars: true,
          jawaban_pgs: {
            include: {
              opsis: {
                include: {
                  soals: true
                }
              }
            }
          },
          jawaban_esais: {
            include: {
              soals: true,
              admins: true
            }
          }
        }
      });
      return attempt;
    } catch (error) {
      throw error;
    }
  }

  // Get attempts by level
  static async getAttemptsByLevel(levelId) {
    try {
      const attempts = await prisma.attempts.findMany({
        where: { id_level: parseInt(levelId) },
        include: {
          levels: {
            include: {
              sections: true
            }
          },
          pelajars: true,
          jawaban_pgs: {
            include: {
              opsis: {
                include: {
                  soals: true
                }
              }
            }
          },
          jawaban_esais: {
            include: {
              soals: true,
              admins: true
            }
          }
        },
        orderBy: {
          id: 'desc'
        }
      });
      return attempts;
    } catch (error) {
      throw error;
    }
  }

  // Get attempts by pelajar
  static async getAttemptsByPelajar(pelajarId) {
    try {
      const attempts = await prisma.attempts.findMany({
        where: { id_pelajar: parseInt(pelajarId) },
        include: {
          levels: {
            include: {
              sections: true
            }
          },
          pelajars: true,
          jawaban_pgs: {
            include: {
              opsis: {
                include: {
                  soals: true
                }
              }
            }
          },
          jawaban_esais: {
            include: {
              soals: true,
              admins: true
            }
          }
        },
        orderBy: {
          id: 'desc'
        }
      });
      return attempts;
    } catch (error) {
      throw error;
    }
  }

  // Create attempt
  static async createAttempt(id_level, id_pelajar, skor) {
    try {
      const attempt = await prisma.attempts.create({
        data: {
          id_level: parseInt(id_level),
          id_pelajar: parseInt(id_pelajar),
          skor: parseFloat(skor)
        },
        include: {
          levels: {
            include: {
              sections: true
            }
          },
          pelajars: true
        }
      });
      return attempt;
    } catch (error) {
      throw error;
    }
  }

  // Update attempt
  static async updateAttempt(id, skor) {
    try {
      const attempt = await prisma.attempts.update({
        where: { id: parseInt(id) },
        data: {
          skor: parseFloat(skor)
        },
        include: {
          levels: {
            include: {
              sections: true
            }
          },
          pelajars: true
        }
      });
      return attempt;
    } catch (error) {
      throw error;
    }
  }

  // Delete attempt
  static async deleteAttempt(id) {
    try {
      const attempt = await prisma.attempts.delete({
        where: { id: parseInt(id) }
      });
      return attempt;
    } catch (error) {
      throw error;
    }
  }

  // Create attempt with answers (Transaction)
  static async createAttemptWithAnswers(id_level, id_pelajar, skor, jawaban_pgs, jawaban_esais) {
    try {
      return await prisma.$transaction(async (tx) => {
        // 1. Create Attempt
        const attempt = await tx.attempts.create({
          data: {
            id_level: parseInt(id_level),
            id_pelajar: parseInt(id_pelajar),
            skor: parseFloat(skor)
          }
        });

        // 2. Create Jawaban PGs
        if (jawaban_pgs && jawaban_pgs.length > 0) {
          await tx.jawabanPGs.createMany({
            data: jawaban_pgs.map(j => ({
              id_attempt: attempt.id,
              id_opsi: parseInt(j.id_opsi),
              skor: parseFloat(j.skor)
            }))
          });
        }

        // 3. Create Jawaban Esais
        if (jawaban_esais && jawaban_esais.length > 0) {
          await tx.jawabanEsais.createMany({
            data: jawaban_esais.map(j => ({
              id_attempt: attempt.id,
              id_soal: parseInt(j.id_soal),
              text_jawaban_esai: j.text_jawaban_esai,
              skor: parseFloat(j.skor)
            }))
          });
        }

        return attempt;
      });
    } catch (error) {
      throw error;
    }
  }
  // Recalculate score
  static async recalculateScore(id) {
    try {
      const attempt = await prisma.attempts.findUnique({
        where: { id: parseInt(id) },
        include: {
          levels: {
            include: {
              soals: true
            }
          },
          jawaban_pgs: true,
          jawaban_esais: true
        }
      });

      if (!attempt) return null;

      let totalScore = 0;

      // Sum PG scores
      if (attempt.jawaban_pgs) {
        attempt.jawaban_pgs.forEach(j => {
          totalScore += parseFloat(j.skor || 0);
        });
      }

      // Sum Essay scores
      if (attempt.jawaban_esais) {
        attempt.jawaban_esais.forEach(j => {
          totalScore += parseFloat(j.skor || 0);
        });
      }

      // Calculate percentage
      const maxScore = attempt.levels && attempt.levels.soals ? attempt.levels.soals.length : 0;
      const finalPercentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

      // Update attempt
      return await prisma.attempts.update({
        where: { id: parseInt(id) },
        data: {
          skor: finalPercentage
        }
      });

    } catch (error) {
      throw error;
    }
  }
}

module.exports = Attempt;
