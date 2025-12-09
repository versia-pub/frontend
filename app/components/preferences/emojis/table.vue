<script setup lang="tsx">
import type {
    ColumnDef,
    ColumnFiltersState,
    ExpandedState,
    SortingState,
    Updater,
    VisibilityState,
} from "@tanstack/vue-table";
import {
    FlexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useVueTable,
} from "@tanstack/vue-table";
import type { CustomEmoji } from "@versia/client/schemas";
import {
    ArrowDownAZ,
    ArrowUpAz,
    ArrowUpDown,
    ChevronDown,
    Ellipsis,
    Globe,
    Home,
    Plus,
} from "lucide-vue-next";
import { ref } from "vue";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import BatchDropdown from "./batch-dropdown.vue";
import Dropdown from "./dropdown.vue";
import Uploader from "./uploader.vue";

// No destructuring props to avoid reactivity issues
const props = defineProps<{
    emojis: z.infer<typeof CustomEmoji>[];
    canUpload: boolean;
}>();

const emojisRef = computed(() => props.emojis);

const valueUpdater = <T extends Updater<any>>(updaterOrValue: T, ref: Ref) => {
    ref.value =
        typeof updaterOrValue === "function"
            ? updaterOrValue(ref.value)
            : updaterOrValue;
};

const columns: ColumnDef<z.infer<typeof CustomEmoji>>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                modelValue={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onUpdate:modelValue={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                modelValue={row.getIsSelected()}
                onUpdate:modelValue={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "url",
        header: "Image",
        cell: ({ row }) => (
            <img
                src={row.getValue("url")}
                alt={`:${row.getValue("shortcode")}:`}
                title={row.getValue("shortcode")}
                class="h-[1lh] align-middle inline not-prose hover:scale-110 transition-transform duration-75 ease-in-out"
            />
        ),
    },
    {
        accessorKey: "shortcode",
        header: ({ column }) => {
            return (
                <Button
                    variant="link"
                    class="!p-0 !h-auto"
                    // @ts-expect-error types don't include onClick
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Shortcode
                    {column.getIsSorted() === false ? (
                        <ArrowUpDown class="ml-2 size-4" />
                    ) : column.getIsSorted() === "asc" ? (
                        <ArrowDownAZ class="ml-2 size-4" />
                    ) : (
                        <ArrowUpAz class="ml-2 size-4" />
                    )}
                </Button>
            );
        },
        cell: ({ row }) => (
            <div class="font-mono">{row.getValue("shortcode")}</div>
        ),
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <Button
                    variant="link"
                    class="!p-0 !h-auto"
                    // @ts-expect-error types don't include onClick
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Category
                    {column.getIsSorted() === false ? (
                        <ArrowUpDown class="ml-2 size-4" />
                    ) : column.getIsSorted() === "asc" ? (
                        <ArrowDownAZ class="ml-2 size-4" />
                    ) : (
                        <ArrowUpAz class="ml-2 size-4" />
                    )}
                </Button>
            );
        },
        cell: ({ row }) => (
            <div class="font-mono">
                {row.getValue("category") ?? "Uncategorized"}
            </div>
        ),
    },
    {
        accessorKey: "global",
        header: ({ column }) => {
            return (
                <Button
                    variant="link"
                    class="!p-0 !h-auto"
                    // @ts-expect-error types don't include onClick
                    onClick={() => {
                        const filter = column.getFilterValue();

                        if (filter === undefined) {
                            column.setFilterValue(false);
                        } else if (filter === false) {
                            column.setFilterValue(true);
                        } else {
                            column.setFilterValue(undefined);
                        }
                    }}
                >
                    Uploader
                    {column.getFilterValue() === undefined ? (
                        <Ellipsis class="ml-2 size-4" />
                    ) : column.getFilterValue() ? (
                        <Globe class="ml-2 size-4" />
                    ) : (
                        <Home class="ml-2 size-4" />
                    )}
                </Button>
            );
        },
        cell: ({ row }) => (
            <div class="font-mono">
                {row.getValue("global") ? "Admin" : "You"}
            </div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        header: ({ table }) => {
            const selected = table
                .getFilteredSelectedRowModel()
                .rows.map((r) => r.original);

            return (
                <div class="relative">
                    <BatchDropdown emojis={selected}>
                        <Button
                            variant="ghost"
                            size="icon"
                            // @ts-expect-error types don't include title
                            title="Open menu"
                            disabled={selected.length === 0}
                        >
                            <Ellipsis class="size-4" />
                        </Button>
                    </BatchDropdown>
                </div>
            );
        },
        cell: ({ row }) => {
            const emoji = row.original;

            return (
                <div class="relative">
                    <Dropdown emoji={emoji} />
                </div>
            );
        },
    },
];

const sorting = ref<SortingState>([
    {
        id: "shortcode",
        desc: false,
    },
]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const expanded = ref<ExpandedState>({});

const table = useVueTable({
    data: emojisRef,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: (updaterOrValue) =>
        valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: (updaterOrValue) =>
        valueUpdater(updaterOrValue, columnVisibility),
    onRowSelectionChange: (updaterOrValue) =>
        valueUpdater(updaterOrValue, rowSelection),
    onExpandedChange: (updaterOrValue) =>
        valueUpdater(updaterOrValue, expanded),
    state: {
        get sorting() {
            return sorting.value;
        },
        get columnFilters() {
            return columnFilters.value;
        },
        get columnVisibility() {
            return columnVisibility.value;
        },
        get rowSelection() {
            return rowSelection.value;
        },
        get expanded() {
            return expanded.value;
        },
    },
});
</script>

<template>
    <div class="w-full">
        <div class="flex gap-2 items-center py-4">
            <Input
                class="max-w-52 mr-auto"
                placeholder="Filter emojis..."
                :model-value="(table.getColumn('shortcode')?.getFilterValue() as string)"
                @update:model-value="table.getColumn('shortcode')?.setFilterValue($event)"
            />
            <Uploader v-if="props.canUpload">
                <Button variant="outline" size="icon" title="Upload emoji">
                    <Plus class="size-4"/>
                </Button>
            </Uploader>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline">
                        Columns
                        <ChevronDown class="ml-2 size-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuCheckboxItem
                        v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
                        :key="column.id"
                        class="capitalize"
                        :model-value="column.getIsVisible()"
                        @update:model-value="(value) => {
                            column.toggleVisibility(!!value)
                        }"
                    >
                        {{ column.id }}
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div class="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow
                        v-for="headerGroup in table.getHeaderGroups()"
                        :key="headerGroup.id"
                    >
                        <TableHead
                            v-for="header in headerGroup.headers"
                            :key="header.id"
                            class=""
                        >
                            <FlexRender
                                v-if="!header.isPlaceholder"
                                :render="header.column.columnDef.header"
                                :props="header.getContext()"
                            />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <template v-if="table.getRowModel().rows?.length">
                        <template
                            v-for="row in table.getRowModel().rows"
                            :key="row.id"
                        >
                            <TableRow
                                :data-state="row.getIsSelected() && 'selected'"
                            >
                                <TableCell
                                    v-for="cell in row.getVisibleCells()"
                                    :key="cell.id"
                                >
                                    <FlexRender
                                        :render="cell.column.columnDef.cell"
                                        :props="cell.getContext()"
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow v-if="row.getIsExpanded()">
                                <TableCell :colspan="row.getAllCells().length">
                                    {{ JSON.stringify(row.original) }}
                                </TableCell>
                            </TableRow>
                        </template>
                    </template>

                    <TableRow v-else>
                        <TableCell
                            :colspan="columns.length"
                            class="h-24 text-center"
                        >
                            No results.
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <div class="flex items-center justify-end space-x-2 py-4">
            <div class="flex-1 text-sm text-muted-foreground">
                {{ table.getFilteredSelectedRowModel().rows.length }}of
                {{ table.getFilteredRowModel().rows.length }}row(s) selected.
            </div>
            <div class="space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    :disabled="!table.getCanPreviousPage()"
                    @click="table.previousPage()"
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    :disabled="!table.getCanNextPage()"
                    @click="table.nextPage()"
                >
                    Next
                </Button>
            </div>
        </div>
    </div>
</template>
