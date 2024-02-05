import networkx as nx
data = open('./input.txt')

graph = nx.Graph()

for line in data:
    left, right = line.split(":")
    for node in right.strip().split():
        graph.add_edge(left, node)
        graph.add_edge(node, left)

print(nx.minimum_edge_cut(graph))
# a, b = nx.connected_components(graph)
#
# print(len(a) * len(b))
