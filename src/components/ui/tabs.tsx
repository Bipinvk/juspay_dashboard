import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils'; // Utility function to merge Tailwind classes
import { gsap } from 'gsap';

// Define types for props
interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> { }
interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> { }
interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> { }
interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> { }

// Tabs Root Component
const Tabs = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Root>,
    TabsProps
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Root
        ref={ref}
        className={cn('w-full', className)}
        {...props}
    />
));
Tabs.displayName = 'Tabs';

// Tabs List Component
const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    TabsListProps
>(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            'flex flex-wrap justify-start border-b border-gray-200',
            className
        )}
        {...props}
    />
));
TabsList.displayName = 'TabsList';

// Tabs Trigger Component
const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    TabsTriggerProps
>(({ className, children, ...props }, ref) => {
    const triggerRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        if (triggerRef.current) {
            // GSAP animation for active tab
            gsap.to(triggerRef.current, {
                scale: props['data-state'] === 'active' ? 1.05 : 1,
                color: props['data-state'] === 'active' ? '#2563eb' : '#4b5563',
                borderBottomColor: props['data-state'] === 'active' ? '#2563eb' : 'transparent',
                duration: 0.3,
                ease: 'power2.out',
            });
        }
    }, [props['data-state']]);

    return (
        <TabsPrimitive.Trigger
            ref={triggerRef}
            className={cn(
                'px-4 py-2 text-sm font-medium text-gray-600 transition-all',
                'hover:text-blue-600 data-[state=active]:text-blue-600',
                'data-[state=active]:border-b-2 data-[state=active]:border-blue-600',
                className
            )}
            {...props}
        >
            {children}
        </TabsPrimitive.Trigger>
    );
});
TabsTrigger.displayName = 'TabsTrigger';

// Tabs Content Component
const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    TabsContentProps
>(({ className, ...props }, ref) => {
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (contentRef.current) {
            // GSAP animation for content transition
            gsap.fromTo(
                contentRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power3.out',
                }
            );
        }
    }, [props['data-state']]);

    return (
        <TabsPrimitive.Content
            ref={contentRef}
            className={cn('mt-4', className)}
            {...props}
        />
    );
});
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };