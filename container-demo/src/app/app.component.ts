import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Extend Window interface for type safety
declare global {
  interface Window {
    ENV_BACKGROUND_COLOR?: string;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Container Technology Demo';
  backgroundColor = '#ffffff';
  
  containerBenefits = [
    {
      icon: '🚀',
      title: 'Portability',
      description: 'Build once, run anywhere. Containers ensure consistent behavior across development, testing, and production environments.'
    },
    {
      icon: '⚡',
      title: 'Fast Deployment',
      description: 'Containers start in seconds, enabling rapid scaling and quick recovery from failures.'
    },
    {
      icon: '💰',
      title: 'Resource Efficiency',
      description: 'Share the OS kernel, using fewer resources than traditional VMs while maintaining isolation.'
    },
    {
      icon: '🔧',
      title: 'Simplified Management',
      description: 'Package applications with all dependencies, eliminating "it works on my machine" problems.'
    },
    {
      icon: '🔄',
      title: 'Easy Scaling',
      description: 'Quickly scale up or down based on demand with orchestration platforms.'
    },
    {
      icon: '🛡️',
      title: 'Isolation',
      description: 'Run multiple containers on the same host without conflicts, improving security and stability.'
    }
  ];

  comparisonData = [
    {
      category: 'Best For',
      aca: 'Serverless container workloads, microservices, event-driven apps',
      aks: 'Complex applications, full Kubernetes control, enterprise workloads'
    },
    {
      category: 'Management Overhead',
      aca: 'Low - Fully managed, no cluster management',
      aks: 'Medium to High - You manage the cluster and nodes'
    },
    {
      category: 'Scaling',
      aca: 'Automatic scale to zero, event-driven scaling (KEDA built-in)',
      aks: 'Manual or automated scaling with HPA/VPA, no scale to zero'
    },
    {
      category: 'Pricing Model',
      aca: 'Pay per second for resources used, can scale to zero',
      aks: 'Pay for VM nodes even when idle'
    },
    {
      category: 'Kubernetes Control',
      aca: 'Limited - Abstracted Kubernetes, simplified APIs',
      aks: 'Full - Complete Kubernetes API access and customization'
    },
    {
      category: 'Networking',
      aca: 'Simplified ingress, built-in load balancing',
      aks: 'Full control over networking, complex configurations possible'
    },
    {
      category: 'Setup Time',
      aca: 'Minutes - Quick deployment',
      aks: 'Hours - More configuration required'
    },
    {
      category: 'Use Cases',
      aca: 'APIs, background jobs, web apps, event processing',
      aks: 'Complex stateful apps, custom networking, compliance requirements'
    }
  ];

  ngOnInit() {
    // Read background color from environment variable injected at runtime
    const bgColor = window.ENV_BACKGROUND_COLOR || '#ffffff';
    this.backgroundColor = bgColor;
    this.applyBackgroundColor();
  }

  private applyBackgroundColor() {
    document.body.style.backgroundColor = this.backgroundColor;
  }
}
