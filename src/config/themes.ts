interface Quote {
  text: string;
  source: string;
  context: string;
}

interface EndingData {
  description: string;
  implications: string[];
  questions: string[];
}

interface TopicData {
  quote?: Quote;
  endings?: Record<string, EndingData>;
}

interface ThemeConfig {
  name: string;
  background: string;
  introduction: string;
  topics: Record<string, TopicData>;
}

const themes: Record<string, ThemeConfig> = {
  "Dystopian Fiction": {
    name: "Dystopian Fiction",
    background: "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&q=80",
    introduction: "Dystopian fiction challenges us to imagine alternative futures where society has taken a dark turn. By exploring these narratives, we can better understand our own world and the choices that shape it. Today, we'll reimagine dystopian endings to explore different narrative possibilities.",
    topics: {
      "control": {
        quote: {
          text: "The Party seeks power entirely for its own sake. We are not interested in the good of others; we are interested solely in power, pure power.",
          source: "George Orwell, 1984",
          context: "O'Brien explains the Party's motivation to Winston Smith during his interrogation."
        },
        endings: {
          "rebellion": {
            description: "The protagonist leads or joins a rebellion against the oppressive system, fighting for freedom and change.",
            implications: [
              "Explores the power of collective action",
              "Questions the sustainability of oppressive systems",
              "Examines the cost of resistance"
            ],
            questions: [
              "How does the protagonist's character arc support this ending?",
              "What would be the realistic consequences of rebellion?",
              "How might this ending reflect real-world resistance movements?",
              "What message does this ending convey about power structures?"
            ]
          },
          "assimilation": {
            description: "The protagonist accepts or is forced to accept the dystopian reality, becoming part of the system they once opposed.",
            implications: [
              "Explores the power of societal pressure",
              "Questions human resilience and breaking points",
              "Examines the nature of complicity"
            ],
            questions: [
              "What psychological changes would the protagonist undergo?",
              "How does this ending challenge or reinforce the dystopian themes?",
              "What commentary does this make on conformity?",
              "How might readers respond emotionally to this ending?"
            ]
          },
          "escape": {
            description: "The protagonist finds a way to escape the dystopian society, either physically or mentally, finding freedom outside the system.",
            implications: [
              "Explores the concept of utopian alternatives",
              "Questions whether escape is truly possible",
              "Examines individual vs. collective responsibility"
            ],
            questions: [
              "What would a world beyond the dystopia look like?",
              "Is escape a form of resistance or surrender?",
              "What responsibility does the escapee have to those left behind?",
              "How does this ending comment on hope and possibility?"
            ]
          }
        }
      }
    }
  },
  "Macbeth": {
    name: "Macbeth",
    background: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80",
    introduction: "Shakespeare's Macbeth explores themes of ambition, power, and moral corruption. By reimagining alternative endings to this classic tragedy, we can explore different character choices and their consequences.",
    topics: {
      "ambition": {
        quote: {
          text: "I have no spur to prick the sides of my intent, but only vaulting ambition, which o'erleaps itself and falls on the other.",
          source: "William Shakespeare, Macbeth",
          context: "Macbeth contemplates his motivations before Duncan's murder."
        },
        endings: {
          "redemption": {
            description: "Macbeth recognizes his moral corruption and seeks redemption before his downfall.",
            implications: [
              "Explores the possibility of moral recovery",
              "Questions whether redemption can follow such acts",
              "Examines the nature of guilt and conscience"
            ],
            questions: [
              "How would Macbeth's character need to develop for this ending?",
              "Would Lady Macbeth's role change in a redemption narrative?",
              "How might this ending alter the play's message about ambition?",
              "What would redemption look like for someone who has committed such acts?"
            ]
          },
          "victory": {
            description: "Macbeth successfully defends his crown and rule, establishing a new dynasty.",
            implications: [
              "Challenges the moral framework of the original",
              "Questions whether 'evil' can triumph",
              "Examines the nature of political power"
            ],
            questions: [
              "How would Macbeth need to change to maintain power?",
              "What would Scotland look like under his continued rule?",
              "How would this ending change the play's message?",
              "Would the supernatural elements play a different role?"
            ]
          },
          "exile": {
            description: "Macbeth escapes Scotland before his defeat, living in exile with the burden of his actions.",
            implications: [
              "Explores consequences beyond death",
              "Questions whether punishment can take forms other than death",
              "Examines living with guilt"
            ],
            questions: [
              "How would exile affect Macbeth psychologically?",
              "Would Lady Macbeth accompany him or meet a different fate?",
              "How might this ending comment on justice?",
              "What would Macbeth's legacy be in Scotland?"
            ]
          }
        }
      }
    }
  },
  "Modern Novel": {
    name: "Modern Novel",
    background: "https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&q=80",
    introduction: "Modern novels often explore complex themes of identity, technology, and social change. By reimagining their endings, we can explore different narrative possibilities and their implications for character development and thematic resonance.",
    topics: {
      "identity": {
        quote: {
          text: "We contain multitudes that don't fit into neat little boxes.",
          source: "Nicola Yoon, Everything, Everything",
          context: "The protagonist reflects on the complexity of human identity."
        },
        endings: {
          "transformation": {
            description: "The protagonist undergoes a profound identity transformation, emerging as someone new.",
            implications: [
              "Explores the malleability of identity",
              "Questions what makes us who we are",
              "Examines how change affects relationships"
            ],
            questions: [
              "What core aspects of identity would remain despite transformation?",
              "How would relationships adapt to this new identity?",
              "What catalysts would make this transformation believable?",
              "How might this ending comment on authenticity?"
            ]
          },
          "integration": {
            description: "The protagonist reconciles conflicting aspects of their identity, finding wholeness.",
            implications: [
              "Explores the complexity of modern identity",
              "Questions binary thinking about self",
              "Examines the journey toward self-acceptance"
            ],
            questions: [
              "What previously conflicting elements would be integrated?",
              "How would this integration manifest in the protagonist's actions?",
              "What message does this ending convey about identity?",
              "How might this ending resonate with readers' own experiences?"
            ]
          },
          "digital": {
            description: "The protagonist's identity becomes intertwined with or transferred to digital/virtual space.",
            implications: [
              "Explores the frontier of digital identity",
              "Questions the boundaries between physical and virtual",
              "Examines what it means to be human"
            ],
            questions: [
              "How would digital existence change the protagonist's sense of self?",
              "What would be gained or lost in this transition?",
              "How might this ending comment on our increasingly digital lives?",
              "What philosophical questions does this raise about consciousness?"
            ]
          }
        }
      }
    }
  },
  "Haroun and the Sea of Stories": {
    name: "Haroun and the Sea of Stories",
    background: "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&q=80",
    introduction: "Like the streams in the Ocean of Stories, different voices flow together to create meaning. Today, we'll explore how characters with opposing views about storytelling reveal deeper truths about imagination, censorship, and the power of narrative. Through their dialogues, we'll uncover the vital importance of stories in shaping our understanding of the world. Think of yourself as both storyteller and critic, navigating between different perspectives to understand why stories matter.",
    topics: {
      "storytelling": {
        quote: {
          text: "But now that I know that stories can help, I think I should tell one now that might help us all. And before anyone could stop him, Haroun began to speak in the dark.",
          source: "Haroun and the Sea of Stories, Chapter 12",
          context: "Haroun's realization of the transformative power of storytelling at the story's climax"
        },
        endings: {
          "triumph": {
            description: "Stories flow freely again, defeating the forces of silence",
            implications: [
              "Freedom of expression prevails",
              "Imagination conquers darkness",
              "Communities reconnect through stories",
              "Hope is restored"
            ],
            questions: [
              "How does the restoration of stories change society?",
              "What role does imagination play in victory?",
              "How do characters grow through storytelling?",
              "What new possibilities emerge?"
            ]
          },
          "resistance": {
            description: "Stories continue despite ongoing censorship, becoming symbols of resistance",
            implications: [
              "Underground storytelling networks form",
              "Stories become coded messages",
              "Creativity adapts to constraints",
              "Small victories amid ongoing struggle"
            ],
            questions: [
              "How do stories change when they become acts of resistance?",
              "What new forms might storytelling take?",
              "How do storytellers protect themselves?",
              "What power do stories have even when suppressed?"
            ]
          },
          "transformation": {
            description: "The nature of storytelling itself transforms into something new",
            implications: [
              "Stories evolve beyond traditional forms",
              "New connections between teller and audience",
              "Technology and tradition merge",
              "Unexpected consequences emerge"
            ],
            questions: [
              "How might the Ocean of Stories itself change?",
              "What new relationships form between stories?",
              "How does transformation affect Khattam-Shud?",
              "What is gained and lost in this transformation?"
            ]
          }
        }
      }
    }
  }
};

export const getThemeConfig = (themeName: string): ThemeConfig => {
  return themes[themeName] || {
    name: "Default",
    background: "https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&q=80",
    introduction: "Creative writing allows us to explore alternative narratives and perspectives. By reimagining endings, we can develop our understanding of character, plot, and theme.",
    topics: {
      "default": {
        quote: {
          text: "The greatest part of a writer's time is spent in reading, in order to write; a man will turn over half a library to make one book.",
          source: "Samuel Johnson",
          context: "Johnson discussing the writing process with James Boswell."
        }
      }
    }
  };
};

export default themes;