

export interface PromptItem {
  id: string;
  type: string;
  title: string;
  content: string;
  views: number;
  author: string;
}

export interface PromptCategory {
  id: string;
  label: string;
  iconType: string;
}

export class PromptsService {
  private mockPrompts: PromptItem[] = [
    { id: '1', type: 'image', title: 'Cyberpunk Cityscape', content: 'A futuristic city street at night, neon lights, rain-slicked roads, 8k resolution, cinematic lighting, photorealistic.', views: 1250, author: 'NeonDreamer' },
    { id: '2', type: 'agent', title: 'Expert Code Reviewer', content: 'You are a senior principal engineer. Review the following code for security, performance, and best practices. Provide specific, actionable feedback.', views: 8930, author: 'DevOpsPro' },
    { id: '3', type: 'text', title: 'Creative Story Generator', content: 'Write a short story about a time traveler who keeps accidentally arriving 5 minutes late to historically significant events.', views: 420, author: 'WriterBot' },
    { id: '4', type: 'music', title: 'Epic Orchestral Trailer', content: 'A fast-paced, epic orchestral track with heavy brass, soaring strings, and a powerful choir climax, suitable for an action movie trailer.', views: 3100, author: 'ComposerX' },
    { id: '5', type: 'video', title: 'Time-lapse of blooming flower', content: 'A high-definition macro time-lapse video of a rare orchid blooming over a dark background, smooth transition.', views: 800, author: 'NatureLens' },
    { id: '6', type: 'sound', title: 'Sci-fi UI Notification', content: 'A short, crisp digital chime with a slight echo, sounding like a futuristic interface success notification.', views: 5600, author: 'AudioMage' }
  ];

  private categories: PromptCategory[] = [
    { id: 'all', label: 'prompts:type_all', iconType: 'zap' },
    { id: 'text', label: 'prompts:type_text', iconType: 'terminal' },
    { id: 'agent', label: 'prompts:type_agent', iconType: 'zap' },
    { id: 'image', label: 'prompts:type_image', iconType: 'image' },
    { id: 'video', label: 'prompts:type_video', iconType: 'video' },
    { id: 'music', label: 'prompts:type_music', iconType: 'music' },
    { id: 'sound', label: 'prompts:type_sound', iconType: 'sound' },
  ];

  async getPrompts(): Promise<PromptItem[]> {
    return Promise.resolve([...this.mockPrompts]);
  }

  async getCategories(): Promise<PromptCategory[]> {
    return Promise.resolve([...this.categories]);
  }
}

export const promptsService = new PromptsService();
