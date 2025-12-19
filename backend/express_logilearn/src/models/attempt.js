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
}

module.exports = Attempt;
